import requests


class TechnicalAnalyzer:

    @staticmethod
    def analyze(url: str, soup, response):

        # HTTPS
        https = url.startswith("https://")

        # Redirect
        redirected = len(response.history) > 0

        # robots.txt
        try:
            robots = requests.get(
                url.rstrip("/") + "/robots.txt",
                timeout=5
            )
            robots_exists = robots.status_code == 200
        except:
            robots_exists = False

        # sitemap.xml
        try:
            sitemap = requests.get(
                url.rstrip("/") + "/sitemap.xml",
                timeout=5
            )
            sitemap_exists = sitemap.status_code == 200
        except:
            sitemap_exists = False

        # Canonical
        canonical = soup.find(
            "link",
            rel="canonical"
        )

        canonical_exists = canonical is not None

        # Indexability
        robots_meta = soup.find(
            "meta",
            attrs={"name": "robots"}
        )

        if robots_meta:
            content = robots_meta.get("content", "").lower()
            indexable = "noindex" not in content
        else:
            indexable = True

        # Structured Data
        structured = soup.find_all(
            "script",
            attrs={"type": "application/ld+json"}
        )

        structured_exists = len(structured) > 0

        return {

            "https": https,

            "redirected": redirected,

            "robots_txt": robots_exists,

            "sitemap_xml": sitemap_exists,

            "canonical": canonical_exists,

            "indexable": indexable,

            "structured_data": structured_exists

        }