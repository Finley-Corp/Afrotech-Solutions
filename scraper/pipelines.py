import os
import re
import requests
import hashlib
import logging
import psycopg2
from psycopg2.extras import Json
from imagekitio import ImageKit

def load_env_local():
    possible_paths = [
        ".env.local",
        "../.env.local",
        os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".env.local"),
        os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", ".env.local")
    ]
    for path in possible_paths:
        if os.path.exists(path):
            try:
                with open(path, "r", encoding="utf-8") as f:
                    for line in f:
                        line = line.strip()
                        if not line or line.startswith("#"):
                            continue
                        if "=" in line:
                            k, v = line.split("=", 1)
                            k = k.strip()
                            v = v.strip().strip("'").strip('"')
                            os.environ[k] = v
                break
            except Exception:
                pass

load_env_local()


def _slugify_part(value: str) -> str:
    text = value.lower()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")[:100]


def _slug_from_source_url(source_url: str | None) -> str | None:
    if not source_url:
        return None
    segment = source_url.rstrip("/").split("/")[-1]
    if segment and re.fullmatch(r"[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", segment):
        return segment
    return None


def _build_product_slug(brand: str, name: str, source_url: str | None) -> str:
    return _slug_from_source_url(source_url) or _slugify_part(f"{brand}-{name}") or "product"


class PumpProductPipeline:
    def open_spider(self, spider):
        # Database connection setup
        db_url = os.environ.get("NEON_DATABASE_URL") or os.environ.get("DATABASE_URL")
        if not db_url:
            logging.error("Database connection URL not found in environment (NEON_DATABASE_URL or DATABASE_URL)")
            raise ValueError("Database connection URL not found.")
        
        self.conn = psycopg2.connect(db_url)
        self.cur = self.conn.cursor()
        
        # Ensure products table exists (using exact schema from prompt)
        self.cur.execute("""
            CREATE TABLE IF NOT EXISTS products (
                id          SERIAL PRIMARY KEY,
                brand       TEXT NOT NULL,
                name        TEXT NOT NULL,
                description TEXT,
                specs       JSONB,
                image_url   TEXT,
                source_url  TEXT,
                scraped_at  TIMESTAMP DEFAULT NOW(),
                slug        TEXT
            );
        """)
        self.cur.execute("ALTER TABLE products ADD COLUMN IF NOT EXISTS slug TEXT;")
        self.cur.execute(
            "CREATE UNIQUE INDEX IF NOT EXISTS products_slug_unique_idx ON products (slug);"
        )
        self.conn.commit()

        # ImageKit client setup
        self.private_key = os.environ.get("IMAGEKIT_PRIVATE_KEY")
        
        if self.private_key:
            self.imagekit = ImageKit(
                private_key=self.private_key
            )
            self.imagekit_configured = True
            logging.info("ImageKit client initialized successfully.")
        else:
            self.imagekit_configured = False
            logging.warning("IMAGEKIT_PRIVATE_KEY missing. Skipping ImageKit uploads and using original image URLs.")

    def close_spider(self, spider):
        if hasattr(self, 'cur') and self.cur:
            self.cur.close()
        if hasattr(self, 'conn') and self.conn:
            self.conn.close()

    def process_item(self, item, spider):
        original_img_url = item.get("image_url")
        if original_img_url and "www.ksb.com/medias/" in original_img_url:
            original_img_url = original_img_url.replace("www.ksb.com/medias/", "live-commerce-proxy-e2e-sales.ksb.com/medias/")
        if original_img_url and not original_img_url.startswith(("http://", "https://")):
            # Skip inline SVG/data/blob placeholders that cannot be fetched by requests.
            logging.info(f"Skipping non-http image URL for {item.get('name')}: {original_img_url[:40]}...")
            original_img_url = None
            
        imagekit_url = None
        
        if original_img_url:
            if self.imagekit_configured:
                try:
                    # Download original image
                    logging.info(f"Downloading image from: {original_img_url}")
                    img_response = requests.get(original_img_url, timeout=15, headers={
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
                    })
                    
                    if img_response.status_code == 200:
                        # Generate unique file name
                        url_hash = hashlib.md5(original_img_url.encode('utf-8')).hexdigest()
                        file_name = f"{item['brand']}_{url_hash}.jpg"
                        
                        logging.info(f"Uploading image to ImageKit: {file_name}")
                        upload_response = self.imagekit.files.upload(
                            file=img_response.content,
                            file_name=file_name,
                            folder="/pump_catalog/"
                        )
                        imagekit_url = upload_response.url
                        logging.info(f"Successfully uploaded to ImageKit. URL: {imagekit_url}")
                    else:
                        logging.warning(f"Failed to download image. HTTP status: {img_response.status_code}")
                except Exception as e:
                    logging.error(f"Error during ImageKit upload processing: {e}")
                    # Skip image, leave image_url as NULL rather than crashing
                    imagekit_url = None
            else:
                # If ImageKit is not configured, preserve the original URL or leave it None
                imagekit_url = original_img_url
        
        # Save to Neon DB with duplicate check (upsert logic)
        source_url = item.get("source_url")
        if not source_url:
            logging.warning(f"Item lacks source_url: {item.get('name')}. Skipping db insert.")
            return item

        try:
            # Check if source_url already exists
            self.cur.execute("SELECT id FROM products WHERE source_url = %s", (source_url,))
            row = self.cur.fetchone()
            
            slug = _build_product_slug(item["brand"], item["name"], source_url)
            self.cur.execute("SELECT id FROM products WHERE slug = %s", (slug,))
            slug_row = self.cur.fetchone()
            if slug_row and (not row or slug_row[0] != row[0]):
                suffix = hashlib.sha1(source_url.encode("utf-8")).hexdigest()[:10]
                slug = f"{slug}-{suffix}"

            if row:
                # Update existing record
                logging.info(f"Updating existing product record for URL: {source_url}")
                self.cur.execute("""
                    UPDATE products
                    SET brand = %s,
                        name = %s,
                        description = %s,
                        specs = %s,
                        image_url = %s,
                        slug = COALESCE(slug, %s),
                        scraped_at = NOW()
                    WHERE id = %s
                """, (
                    item['brand'],
                    item['name'],
                    item.get('description'),
                    Json(item.get('specs', {})),
                    imagekit_url,
                    slug,
                    row[0]
                ))
            else:
                # Insert new record
                logging.info(f"Inserting new product record for URL: {source_url}")
                self.cur.execute("""
                    INSERT INTO products (brand, name, description, specs, image_url, source_url, slug, scraped_at)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, NOW())
                """, (
                    item['brand'],
                    item['name'],
                    item.get('description'),
                    Json(item.get('specs', {})),
                    imagekit_url,
                    source_url,
                    slug,
                ))
            
            self.conn.commit()
        except Exception as e:
            self.conn.rollback()
            logging.error(f"Database error during upsert for product {item.get('name')}: {e}")
            
        return item
