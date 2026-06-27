function ContentCard({ content }) {

    if (!content) return null;

    return (

        <div className="dashboard-card">

            <h2>📝 Content Analysis</h2>

            <div className="performance-item">
                <span>Word Count</span>
                <strong>{content.word_count}</strong>
            </div>

            <div className="performance-item">
                <span>Characters</span>
                <strong>{content.character_count}</strong>
            </div>

            <div className="performance-item">
                <span>Readability</span>
                <strong>{content.readability}</strong>
            </div>

            <div className="performance-item">
                <span>Readability Score</span>
                <strong>{content.readability_score}</strong>
            </div>

            <h3 style={{ marginTop: "20px" }}>
                Top Keywords
            </h3>

            {content.top_keywords.map((item, index) => (

                <div
                    className="performance-item"
                    key={index}
                >

                    <span>{item.keyword}</span>

                    <strong>{item.count}</strong>

                </div>

            ))}

        </div>

    );

}

export default ContentCard;