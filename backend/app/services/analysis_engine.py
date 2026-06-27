from app.services.crawler import WebsiteCrawler
from app.services.seo_analyzer import SEOAnalyzer
from app.services.technical import TechnicalAnalyzer
from app.services.content import ContentAnalyzer
from app.services.performance import PerformanceAnalyzer
from app.services.scorer import SEOScorer
from app.services.metadata import MetadataAnalyzer

class AnalysisEngine:

    @staticmethod
    def generate(url: str):

        crawl = WebsiteCrawler.crawl(url)

        on_page = SEOAnalyzer.analyze(
            crawl["url"],
            crawl["soup"]
        )

        technical = TechnicalAnalyzer.analyze(
            crawl["url"],
            crawl["soup"],
            crawl["response"]
        )

        content = ContentAnalyzer.analyze(
            crawl["soup"]
        )

        performance = PerformanceAnalyzer.analyze(
            crawl["response"],
            crawl["url"]
        )
        metadata = MetadataAnalyzer.analyze(
        crawl["soup"]
        )

        score = SEOScorer.calculate(
            technical,
            on_page,
            content,
            performance,
            metadata
        )

        return {

            "technical": technical,
            
            "metadata": metadata,

            "on_page": on_page,

            "content": content,

            "performance": performance,

            "score": score
            

        }