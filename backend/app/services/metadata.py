from bs4 import BeautifulSoup


class MetadataAnalyzer:

    @staticmethod
    def analyze(soup: BeautifulSoup):

        # -----------------------
        # Mobile Friendly
        # -----------------------

        viewport = soup.find(
            "meta",
            attrs={"name": "viewport"}
        )

        mobile_friendly = viewport is not None

        # -----------------------
        # Open Graph
        # -----------------------

        open_graph = {

            "og:title": bool(
                soup.find("meta", property="og:title")
            ),

            "og:description": bool(
                soup.find("meta", property="og:description")
            ),

            "og:image": bool(
                soup.find("meta", property="og:image")
            ),

            "og:url": bool(
                soup.find("meta", property="og:url")
            )

        }

        # -----------------------
        # Twitter
        # -----------------------

        twitter = {

            "twitter:card": bool(
                soup.find(
                    "meta",
                    attrs={"name": "twitter:card"}
                )
            ),

            "twitter:title": bool(
                soup.find(
                    "meta",
                    attrs={"name": "twitter:title"}
                )
            ),

            "twitter:description": bool(
                soup.find(
                    "meta",
                    attrs={"name": "twitter:description"}
                )
            ),

            "twitter:image": bool(
                soup.find(
                    "meta",
                    attrs={"name": "twitter:image"}
                )
            )

        }

        social_meta = (
            any(open_graph.values())
            or
            any(twitter.values())
        )

        return {

            "mobile_friendly": mobile_friendly,

            "open_graph": open_graph,

            "twitter": twitter,

            "social_meta": social_meta

        }