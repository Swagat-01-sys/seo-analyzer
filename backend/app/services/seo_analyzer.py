from urllib.parse import urlparse

from bs4 import BeautifulSoup


class SEOAnalyzer:

    @staticmethod
    def analyze(url: str, soup: BeautifulSoup):

        # -------------------------
        # TITLE
        # -------------------------

        title = ""

        if soup.title:
            title = soup.title.get_text(strip=True)

        # -------------------------
        # META DESCRIPTION
        # -------------------------

        description = ""

        meta = soup.find(
            "meta",
            attrs={"name": "description"}
        )

        if meta:
            description = meta.get("content", "")

        # -------------------------
        # HEADINGS
        # -------------------------

        headings = {}

        for i in range(1, 7):

            headings[f"H{i}"] = [
                tag.get_text(strip=True)
                for tag in soup.find_all(f"h{i}")
            ]

        # -------------------------
        # IMAGE ALT
        # -------------------------

        images = soup.find_all("img")

        image_total = len(images)

        with_alt = sum(
            1
            for img in images
            if img.get("alt")
        )

        without_alt = image_total - with_alt

        # -------------------------
        # LINKS
        # -------------------------

        parsed = urlparse(url)

        domain = parsed.netloc

        internal = 0
        external = 0

        for link in soup.find_all("a", href=True):

            href = link["href"]

            if href.startswith("/"):
                internal += 1

            elif domain in href:
                internal += 1

            elif href.startswith("http"):
                external += 1

        # -------------------------
        # URL STRUCTURE
        # -------------------------

        url_info = {

            "https": url.startswith("https"),

            "length": len(url),

            "contains_query": "?" in url,

            "contains_fragment": "#" in url

        }

        return {

            "title": title,

            "title_length": len(title),

            "meta_description": description,

            "description_length": len(description),

            "headings": headings,

            "images": {

                "total": image_total,

                "with_alt": with_alt,

                "without_alt": without_alt

            },

            "links": {

                "internal": internal,

                "external": external

            },

            "url": url_info

        }