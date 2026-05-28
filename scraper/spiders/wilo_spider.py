import scrapy
from scrapy_playwright.page import PageMethod
from scraper.items import PumpProductItem

class WiloSpider(scrapy.Spider):
    name = "wilo"
    allowed_domains = ["wilo.com"]
    start_urls = ["https://wilo.com/ke/en/Catalogue/en/products-expertise"]

    def start_requests(self):
        for url in self.start_urls:
            yield scrapy.Request(
                url,
                meta={
                    "playwright": True,
                    "playwright_page_methods": [
                        # Wait for cards and real images to lazy load
                        PageMethod("wait_for_selector", "div.card.cl-overview img[src^='//'], div.card.cl-overview img[src^='http']", timeout=30000),
                    ]
                },
                callback=self.parse
            )

    def parse(self, response):
        cards = response.css("div.card.cl-overview")
        self.logger.info(f"Found {len(cards)} Wilo product series cards on catalogue page.")
        
        for card in cards:
            name = card.css(".card-footer h3::text").get()
            rel_url = card.css("a.stretched-link::attr(href)").get()
            img_url = card.css("img.cl-img::attr(src)").get()
            
            if not name or not rel_url:
                continue
                
            abs_url = response.urljoin(rel_url)
            
            # Format image URL
            full_img_url = None
            if img_url:
                if img_url.startswith("//"):
                    full_img_url = "https:" + img_url
                else:
                    full_img_url = response.urljoin(img_url)
            
            item = PumpProductItem(
                brand="wilo",
                name=name.strip(),
                description="",
                image_url=full_img_url,
                source_url=abs_url,
                specs={}
            )
            
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
        self.logger.info(f"Extracting details for Wilo series: {item['name']}")
        
        # 1. Parse Series Description
        # Check Table 0 Row 1 Column 1
        description = ""
        table0 = response.css("table")
        if table0:
            rows = table0[0].css("tr")
            if len(rows) > 1:
                cells = rows[1].css("td::text, td *::text").getall()
                cells = [c.strip() for c in cells if c.strip()]
                if len(cells) > 1:
                    description = cells[1]
        
        if not description:
            # Fallback: get introductory paragraph if available
            description = response.css(".intro-text::text, p::text").get()
            if description:
                description = description.strip()
        
        item["description"] = description if description else f"Wilo high-performance {item['name']} series."
        
        # 2. Parse Specific Product Models from Tables
        tables = response.css("table")
        model_table = None
        
        # Look for table containing product description and article number (usually the last table or one with many columns)
        for table in tables:
            headers = table.css("tr:first-child td::text, tr:first-child th::text, tr:first-child td *::text, tr:first-child th *::text").getall()
            headers = [h.strip().lower() for h in headers if h.strip()]
            if ("article number" in headers or "product description" in headers) and len(headers) >= 5:
                model_table = table
                break
                
        if model_table:
            # Table found, extract models
            rows = model_table.css("tr")
            headers = rows[0].css("td::text, td *::text, th::text, th *::text").getall()
            headers = [h.strip() for h in headers if h.strip()]
            
            self.logger.info(f"Parsing {len(rows)-1} models from specs table with headers: {headers}")
            
            for row in rows[1:]:
                cells = row.css("td::text, td *::text").getall()
                cells = [c.strip() for c in cells if c.strip()]
                
                if len(cells) >= len(headers) - 2 and cells:
                    model_name = cells[0]
                    specs = {}
                    
                    # Create specs mapping
                    for i, val in enumerate(cells[1:]):
                        if i + 1 < len(headers):
                            hdr = headers[i + 1].lower().replace(" ", "_").replace(",", "").replace(".", "").strip()
                            # Clean up keys
                            if hdr == "*":
                                hdr = "specs_info"
                            specs[hdr] = val
                            
                    model_item = PumpProductItem(
                        brand="wilo",
                        name=model_name,
                        description=item["description"],
                        image_url=item["image_url"],
                        source_url=item["source_url"],
                        specs=specs
                    )
                    yield model_item
        else:
            # Fallback: yield the series item itself if no sub-model table is found
            yield item

    def handle_error(self, failure):
        self.logger.error(f"Error loading detail page: {failure.value}")
        item = failure.request.meta.get("item")
        if item:
            yield item
