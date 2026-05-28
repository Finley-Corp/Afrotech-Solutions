import requests
import scrapy
from scraper.items import PumpProductItem

class GrundfosSpider(scrapy.Spider):
    name = "grundfos"
    allowed_domains = ["grundfos.com", "api.grundfos.com"]
    start_urls = ["https://api.grundfos.com/search"]
    graphql_url = "https://api.grundfos.com/search"
    catalog_base_url = "https://product-selection.grundfos.com"
    site = "KE_EN"
    page_size = 100

    def parse(self, response):
        yield from self.fetch_catalog_products()

    def fetch_catalog_products(self):
        total = 0
        offset = 0
        yielded = 0

        while True:
            payload = {
                "query": """
                    query Run($site: SitesEnum!, $limit:Int!, $offset:Int!, $filters:[FilterItem!]) {
                      search(site:$site, limit:$limit, offset:$offset, filters:$filters) {
                        count
                        items {
                          metadata {
                            __typename
                            ... on ProductCenterMetadata {
                              source
                              products
                              baseData {
                                title
                                description
                                url
                                thumbnail
                                pageType
                              }
                            }
                          }
                        }
                      }
                    }
                """,
                "variables": {
                    "site": self.site,
                    "limit": self.page_size,
                    "offset": offset,
                    "filters": [
                        {"field": "PAGE_TYPE", "value": ["product-product"]},
                    ],
                },
            }

            try:
                resp = requests.post(
                    self.graphql_url,
                    json=payload,
                    timeout=45,
                    headers={"Content-Type": "application/json"},
                )
                data = resp.json()
            except Exception as exc:
                self.logger.error(f"Grundfos GraphQL request failed at offset {offset}: {exc}")
                break

            if data.get("errors"):
                self.logger.error(f"Grundfos GraphQL errors at offset {offset}: {data['errors'][:1]}")
                break

            search_data = (data.get("data") or {}).get("search") or {}
            total = search_data.get("count") or 0
            items = search_data.get("items") or []
            if not items:
                break

            self.logger.info(f"Grundfos page offset={offset}: {len(items)} entries (total={total}).")

            for entry in items:
                metadata = entry.get("metadata") or {}
                if metadata.get("__typename") != "ProductCenterMetadata":
                    continue

                base = metadata.get("baseData") or {}
                name = (base.get("title") or "").strip()
                rel_url = (base.get("url") or "").strip()
                if not name or not rel_url:
                    continue

                source_url = requests.compat.urljoin(self.catalog_base_url, rel_url)
                image_url = (base.get("thumbnail") or "").strip() or None
                if image_url and image_url.startswith("//"):
                    image_url = f"https:{image_url}"
                elif image_url and image_url.startswith("/"):
                    image_url = requests.compat.urljoin("https://api.grundfos.com", image_url)

                description = (base.get("description") or "").strip()
                if not description:
                    description = f"Grundfos {name} product range."

                specs = {
                    "source": metadata.get("source", "PRODUCT_CENTER"),
                    "page_type": base.get("pageType", ""),
                }
                related_products = metadata.get("products") or []
                if related_products:
                    specs["related_product_count"] = str(len(related_products))
                    specs["related_products"] = ", ".join(related_products[:12])

                yielded += 1
                yield PumpProductItem(
                    brand="grundfos",
                    name=name,
                    description=description,
                    image_url=image_url,
                    source_url=source_url,
                    specs=specs,
                )

            offset += self.page_size
            if offset >= total:
                break

        self.logger.info(f"Grundfos scraping completed with {yielded} yielded product ranges.")
