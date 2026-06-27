import re
from collections import Counter

import textstat
from bs4 import BeautifulSoup


class ContentAnalyzer:

    @staticmethod
    def analyze(soup: BeautifulSoup):

        # ------------------------
        # Extract Visible Text
        # ------------------------

        text = soup.get_text(" ", strip=True)

        # ------------------------
        # Word Count
        # ------------------------

        words = re.findall(r"\b[a-zA-Z]+\b", text.lower())

        word_count = len(words)

        character_count = len(text)

        # ------------------------
        # Top Keywords
        # ------------------------

        stopwords = {
            "the","is","are","was","were","of","to","in","for",
            "on","at","with","a","an","and","or","by","as","that",
            "this","it","be","from","you","your","we","our"
        }

        filtered = [
            w for w in words
            if len(w) > 2 and w not in stopwords
        ]

        keywords = Counter(filtered).most_common(10)

        top_keywords = []

        for word, count in keywords:
            top_keywords.append({
                "keyword": word,
                "count": count
            })

        # ------------------------
        # Readability
        # ------------------------

        try:
            score = textstat.flesch_reading_ease(text)
        except:
            score = 0

        if score >= 60:
            readability = "Good"
        elif score >= 30:
            readability = "Average"
        else:
            readability = "Poor"

        # ------------------------
        # Heading Hierarchy
        # ------------------------

        headings = []

        for level in range(1, 7):
            headings.extend(
                [level] * len(soup.find_all(f"h{level}"))
            )

        valid = True

        issues = []

        for i in range(1, len(headings)):

            if headings[i] - headings[i - 1] > 1:

                valid = False

                issues.append(
                    f"H{headings[i-1]} jumps to H{headings[i]}"
                )

        return {

            "word_count": word_count,

            "character_count": character_count,

            "top_keywords": top_keywords,

            "readability_score": round(score, 2),

            "readability": readability,

            "heading_hierarchy": {
                "valid": valid,
                "issues": issues
            }

        }