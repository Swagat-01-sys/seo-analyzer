import requests
from bs4 import BeautifulSoup


class WebsiteCrawler:

    @staticmethod
    def crawl(url: str):

        headers = {
            "User-Agent": "Mozilla/5.0"
        }

        response = requests.get(
            url,
            headers=headers,
            timeout=20
        )

        response.raise_for_status()

        soup = BeautifulSoup(
            response.text,
            "lxml"
        )

        return {
            "url": response.url,
            "status_code": response.status_code,
            "html": response.text,
            "response": response,
            "soup": soup
        }