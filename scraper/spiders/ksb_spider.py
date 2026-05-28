import json
import scrapy
from scrapy_playwright.page import PageMethod
from scraper.items import PumpProductItem

class KsbSpider(scrapy.Spider):
    name = "ksb"
    allowed_domains = ["ksb.com"]
    start_urls = ["https://www.ksb.com/en-ke/product/product-catalogue?productType=PUMP"]

    def start_requests(self):
        for url in self.start_urls:
            yield scrapy.Request(
                url,
                meta={
                    "playwright": True,
                    "playwright_page_methods": [
                        # Wait for product cards to load in the browser
                        PageMethod("wait_for_selector", "div.ksb-product-card", timeout=30000),
                    ]
                },
                callback=self.parse
            )

    def parse(self, response):
        cards = response.css("div.ksb-product-card")
        self.logger.info(f"Found {len(cards)} KSB product cards on the catalog page.")
        
        for card in cards:
            name = card.css(".ksb-product-card__headline::text").get()
            desc = card.css(".ksb-product-card__description-text::text").get()
            rel_url = card.css("div.ksb-product-card__image a::attr(href)").get()
            img_url = card.css("div.ksb-product-card__image img::attr(src)").get()
            
            if not name or not rel_url:
                continue
                
            abs_url = response.urljoin(rel_url)
            
            item = PumpProductItem(
                brand="ksb",
                name=name.strip(),
                description=desc.strip() if desc else "",
                image_url=response.urljoin(img_url) if img_url else None,
                source_url=abs_url,
                specs={}
            )
            
            # Follow the link to extract specs from the product detail page
            yield scrapy.Request(
                abs_url,
                meta={
                    "item": item
                },
                callback=self.parse_details,
                errback=self.handle_error
            )

    def parse_details(self, response):
        item = response.meta["item"]
        self.logger.info(f"Extracting detailed specifications for: {item['name']}")
        
        specs = {}
        script_content = response.xpath("//script[@type='application/ld+json']/text()").get()
        
        if script_content:
            try:
                data = json.loads(script_content)
                # Parse additional properties from JSON-LD schema
                props = data.get("additionalProperty", [])
                for p in props:
                    if isinstance(p, dict):
                        p_name = p.get("name")
                        val = p.get("value")
                        unit = p.get("unitText", "")
                        if p_name and val:
                            key = p_name.lower().replace(".", "").replace(" ", "_").strip()
                            specs[key] = f"{val} {unit}".strip()
                
                # Check for description in JSON-LD if not already set
                if not item.get("description") and data.get("description"):
                    item["description"] = data.get("description").strip()
                    
                # Try image from JSON-LD if missing
                if not item.get("image_url") and data.get("image"):
                    img = data.get("image")
                    if isinstance(img, list) and img:
                        item["image_url"] = response.urljoin(img[0])
                    elif isinstance(img, str):
                        item["image_url"] = response.urljoin(img)
            except Exception as e:
                self.logger.error(f"Error parsing JSON-LD for {item['name']}: {e}")
                
        # If no structured data found, look for general attributes in paragraphs
        if not specs:
            paragraphs = response.xpath("//p/text()").getall()
            for p in paragraphs:
                p_lower = p.lower()
                if "flow rate" in p_lower or "max. head" in p_lower:
                    specs["general_attributes"] = p.strip()
                    break

        item["specs"] = specs
        yield item

    def handle_error(self, failure):
        self.logger.error(f"Error loading detail page: {failure.value}")
        # Yield the item as is if detail page fails to load
        item = failure.request.meta.get("item")
        if item:
            yield item
