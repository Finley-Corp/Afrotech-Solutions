import scrapy
import re
from scrapy_playwright.page import PageMethod
from scraper.items import PumpProductItem

class WiloSpider(scrapy.Spider):
    name = "wilo"
    allowed_domains = ["wilo.com"]
    start_urls = ["https://wilo.com/ke/en/Catalogue/en/products-expertise"]

    def _image_score(self, url: str, css_class: str = "") -> int:
        """Prefer photo-like assets over schematic/icon variants."""
        if not url:
            return -999
        score = 0
        u = url.lower()
        c = (css_class or "").lower()
        if "dcividpfinder" in u or "still.jpg" in u:
            score += 80
        if "dcipicpfinder" in u:
            score += 40
        if "mx-auto my-auto" in c:
            score += 35
        if "d-flex mx-auto" in c:
            score += 20
        if "cl-img-logos" in c or "services" in c:
            score -= 80
        if re.search(r"_1\.(png|jpg|jpeg|webp)$", u):
            score += 20
        elif re.search(r"_2\.(png|jpg|jpeg|webp)$", u):
            score += 35
        elif re.search(r"_3\.(png|jpg|jpeg|webp)$", u):
            score += 30
        elif re.search(r"_5\.(png|jpg|jpeg|webp)$", u):
            score += 45
        if "icon" in u or "symbol" in u:
            score -= 30
        if "cookielaw" in u or "powered_by_logo" in u or "wilologo" in u:
            score -= 100
        return score

    def start_requests(self):
        for url in self.start_urls:
            yield scrapy.Request(
                url,
                meta={
                    "playwright": True,
                    "playwright_page_methods": [
                        PageMethod("wait_for_selector", "div.card.cl-overview", timeout=30000),
                        # Capture exactly what the user sees in catalogue cards.
                        PageMethod(
                            "evaluate",
                            """() => Array.from(document.querySelectorAll('div.card.cl-overview')).map((card) => {
                                const name = (card.querySelector('.card-footer h3')?.textContent || '').trim();
                                const href = card.querySelector('a.stretched-link')?.getAttribute('href') || '';
                                const img = card.querySelector('img');
                                const imgSrc = (img?.currentSrc || img?.getAttribute('src') || '').trim();
                                return { name, href, imgSrc };
                            })""",
                        ),
                    ]
                },
                callback=self.parse
            )

    def parse(self, response):
        rendered_cards = []
        for method in response.meta.get("playwright_page_methods", []):
            result = getattr(method, "result", None)
            if isinstance(result, list):
                rendered_cards = result
                break

        cards_data = []
        if rendered_cards:
            cards_data = rendered_cards
        else:
            # Fallback if Playwright evaluate result is unavailable.
            for card in response.css("div.card.cl-overview"):
                cards_data.append(
                    {
                        "name": (card.css(".card-footer h3::text").get() or "").strip(),
                        "href": (card.css("a.stretched-link::attr(href)").get() or "").strip(),
                        "imgSrc": (
                            card.css("img::attr(src)").get()
                            or card.css("img::attr(data-src)").get()
                            or ""
                        ).strip(),
                    }
                )

        self.logger.info(f"Found {len(cards_data)} Wilo product series cards on catalogue page.")

        for card in cards_data:
            name = (card.get("name") or "").strip()
            rel_url = (card.get("href") or "").strip()
            img_url = (card.get("imgSrc") or "").strip()
            if not name or not rel_url:
                continue
                
            abs_url = response.urljoin(rel_url)
            
            # Format image URL
            full_img_url = None
            if img_url and not img_url.startswith("data:"):
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
                    "item": item,
                    "playwright": True,
                    "playwright_page_methods": [
                        PageMethod("wait_for_selector", "img[src*='cms.media.wilo.com']", timeout=20000),
                        PageMethod("wait_for_timeout", 1500),
                    ],
                },
                callback=self.parse_details,
                errback=self.handle_error
            )

        # Follow catalogue pagination so we scrape all listed series pages.
        for next_href in response.css("a.btn.cl-button.btn-secondary::attr(href)").getall():
            next_url = response.urljoin(next_href)
            if "products-expertise?page=" in next_url:
                yield scrapy.Request(
                    next_url,
                    meta={
                        "playwright": True,
                        "playwright_page_methods": [
                            PageMethod(
                                "wait_for_selector",
                                "div.card.cl-overview",
                                timeout=30000,
                            ),
                            PageMethod(
                                "evaluate",
                                """() => Array.from(document.querySelectorAll('div.card.cl-overview')).map((card) => {
                                    const name = (card.querySelector('.card-footer h3')?.textContent || '').trim();
                                    const href = card.querySelector('a.stretched-link')?.getAttribute('href') || '';
                                    const img = card.querySelector('img');
                                    const imgSrc = (img?.currentSrc || img?.getAttribute('src') || '').trim();
                                    return { name, href, imgSrc };
                                })""",
                            ),
                        ],
                    },
                    callback=self.parse,
                )

    def parse_details(self, response):
        item = response.meta["item"]
        self.logger.info(f"Extracting details for Wilo series: {item['name']}")

        candidates = []
        for img in response.css("img"):
            url = (img.attrib.get("src") or "").strip()
            css_class = (img.attrib.get("class") or "").strip()
            if not url or url.startswith("data:"):
                continue
            if "cms.media.wilo.com" not in url and "dcipicpfinder" not in url and "dcividpfinder" not in url:
                continue
            if url.startswith("//"):
                url = f"https:{url}"
            else:
                url = response.urljoin(url)
            candidates.append((url, css_class))

        best_detail = None
        best_score = -999
        for url, css_class in candidates:
            s = self._image_score(url, css_class)
            if s > best_score:
                best_score = s
                best_detail = url

        current_score = self._image_score(item.get("image_url") or "")
        if best_detail and best_score > current_score:
            item["image_url"] = best_detail
        
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

        # Persist one record per catalogue card/series for stable coverage and image mapping.
        yield item

    def handle_error(self, failure):
        self.logger.error(f"Error loading detail page: {failure.value}")
        item = failure.request.meta.get("item")
        if item:
            yield item
