function MetadataCard({ metadata }) {

    if (!metadata) return null;

    return (

        <div className="dashboard-card">

            <h2>📱 Metadata</h2>

            <div className="tech-item">
                <span>Mobile Friendly</span>
                <span>{metadata.mobile_friendly ? "✅" : "❌"}</span>
            </div>

            <div className="tech-item">
                <span>Open Graph</span>
                <span>{metadata.social_meta ? "✅" : "❌"}</span>
            </div>

            <div className="tech-item">
                <span>Twitter Card</span>
                <span>
                    {metadata.twitter?.["twitter:card"] ? "✅" : "❌"}
                </span>
            </div>

        </div>

    );

}

export default MetadataCard;