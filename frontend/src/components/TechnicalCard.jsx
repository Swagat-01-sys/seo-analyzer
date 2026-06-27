function TechnicalCard({ technical }) {

    if (!technical) return null;

    const Item = ({ label, value }) => (
        <div className="tech-item">
            <span>{label}</span>
            <span className={value ? "good" : "bad"}>
                {value ? "✅" : "❌"}
            </span>
        </div>
    );

    return (

        <div className="dashboard-card">

            <h2>Technical Health</h2>

            <Item label="HTTPS" value={technical.https} />

            <Item label="Robots.txt" value={technical.robots_txt} />

            <Item label="Sitemap.xml" value={technical.sitemap_xml} />

            <Item label="Canonical Tag" value={technical.canonical} />

            <Item label="Indexable" value={technical.indexable} />

            <Item
                label="Structured Data"
                value={technical.structured_data}
            />

        </div>

    );

}

export default TechnicalCard;