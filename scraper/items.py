import scrapy

class PumpProductItem(scrapy.Item):
    brand = scrapy.Field()
    name = scrapy.Field()
    description = scrapy.Field()
    specs = scrapy.Field()
    image_url = scrapy.Field()
    source_url = scrapy.Field()
