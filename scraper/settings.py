import os

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

BOT_NAME = "scraper"

SPIDER_MODULES = ["scraper.spiders"]
NEWSPIDER_MODULE = "scraper.spiders"

# Crawl responsibly by identifying yourself (and your website) on the user-agent
USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

# Obey robots.txt rules
ROBOTSTXT_OBEY = False

# Configure concurrent requests
CONCURRENT_REQUESTS = 2

# Configure a delay for requests for the same website
DOWNLOAD_DELAY = 3.0

# Disable cookies (enabled by default)
COOKIES_ENABLED = True

# Enable Scrapy-Playwright Download Handlers
DOWNLOAD_HANDLERS = {
    "http": "scrapy_playwright.handler.ScrapyPlaywrightDownloadHandler",
    "https": "scrapy_playwright.handler.ScrapyPlaywrightDownloadHandler",
}

# Asyncio twisted reactor is required for Playwright
TWISTED_REACTOR = "twisted.internet.asyncioreactor.AsyncioSelectorReactor"

# Configure Playwright settings
PLAYWRIGHT_LAUNCH_OPTIONS = {
    "headless": True,
    "args": [
        "--disable-gpu",
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-http2",
    ]
}

# Configure item pipelines
ITEM_PIPELINES = {
    "scraper.pipelines.PumpProductPipeline": 300,
}

# Set settings for asynchronous pipeline execution
REQUEST_FINGERPRINTER_IMPLEMENTATION = "2.7"
FEED_EXPORT_ENCODING = "utf-8"

# Timeout and retry configuration to handle geoblocking fast
DOWNLOAD_TIMEOUT = 15
RETRY_ENABLED = False
