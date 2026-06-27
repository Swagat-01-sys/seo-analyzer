class SEOScorer:

    @staticmethod
    def calculate(
        technical,
        on_page,
        content,
        performance,
        metadata
    ):

        technical_score = 100
        on_page_score = 100
        content_score = 100
        performance_score = 100

        recommendations = []

        # -------------------------
        # Technical
        # -------------------------

        if not technical["https"]:
            technical_score -= 20
            recommendations.append(
                "Enable HTTPS."
            )

        if not technical["robots_txt"]:
            technical_score -= 10
            recommendations.append(
                "Add robots.txt."
            )

        if not technical["sitemap_xml"]:
            technical_score -= 10
            recommendations.append(
                "Create sitemap.xml."
            )

        if not technical["canonical"]:
            technical_score -= 15
            recommendations.append(
                "Add canonical tag."
            )

        if not technical["structured_data"]:
            technical_score -= 10
            recommendations.append(
                "Implement structured data."
            )

        # -------------------------
        # On Page
        # -------------------------

        if on_page["title_length"] < 30 or on_page["title_length"] > 60:
            on_page_score -= 10
            recommendations.append(
                "Optimize title length."
            )

        if (
            on_page["description_length"] < 120
            or
            on_page["description_length"] > 160
        ):
            on_page_score -= 10
            recommendations.append(
                "Optimize meta description."
            )

        if on_page["images"]["without_alt"] > 0:
            on_page_score -= 10
            recommendations.append(
                "Add ALT text to all images."
            )

        # -------------------------
        # Content
        # -------------------------

        if content["word_count"] < 500:
            content_score -= 20
            recommendations.append(
                "Increase content length."
            )

        if content["readability"] == "Poor":
            content_score -= 15
            recommendations.append(
                "Improve readability."
            )

        if not content["heading_hierarchy"]["valid"]:
            content_score -= 10
            recommendations.append(
                "Fix heading hierarchy."
            )

        # -------------------------
        # Performance
        # -------------------------

        if performance["response_time_seconds"] > 2:
            performance_score -= 15
            recommendations.append(
                "Improve server response time."
            )

        if performance["page_size_kb"] > 1500:
            performance_score -= 15
            recommendations.append(
                "Reduce page size."
            )

        if performance["compression"] == "None":
            performance_score -= 10
            recommendations.append(
                "Enable GZIP/Brotli compression."
            )
        
        # -------------------------
        # Metadata
        # -------------------------

        if not metadata["mobile_friendly"]:
            technical_score -= 10

            recommendations.append(
            "Add a viewport meta tag for mobile devices."
            )

        if not metadata["social_meta"]:
            on_page_score -= 10

            recommendations.append(
            "Add Open Graph and Twitter metadata."
            )    
        
        # -------------------------
        # Overall
        # -------------------------

        overall = round(
            (
                technical_score
                + on_page_score
                + content_score
                + performance_score
            ) / 4
        )

        if overall >= 90:
            grade = "A"

        elif overall >= 80:
            grade = "B"

        elif overall >= 70:
            grade = "C"

        elif overall >= 60:
            grade = "D"

        else:
            grade = "F"

        return {

            "overall_score": overall,

            "grade": grade,

            "technical_score": technical_score,

            "on_page_score": on_page_score,

            "content_score": content_score,

            "performance_score": performance_score,

            "recommendations": recommendations

        }