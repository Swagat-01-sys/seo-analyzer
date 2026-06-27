function WebsiteCard({ result }) {

    if (!result) return null;

    const technical = result.results?.technical;
    const performance = result.results?.performance;

    return (
        <div className="dashboard-card">

            <h2>🌐 Website Information</h2>

            <div className="performance-item">
                <span>Website</span>
                <strong>{result.url ?? "-"}</strong>
            </div>

            <div className="performance-item">
                <span>Status</span>
                <strong>{result.status ?? "-"}</strong>
            </div>

            <div className="performance-item">
                <span>HTTPS</span>
                <strong>
                    {technical ? (technical.https ? "✅" : "❌") : "..."}
                </strong>
            </div>

            <div className="performance-item">
                <span>Response Time</span>
                <strong>
                    {performance?.response_time_seconds ?? "-"} s
                </strong>
            </div>

            <div className="performance-item">
                <span>Server</span>
                <strong>
                    {performance?.server ?? "-"}
                </strong>
            </div>

        </div>
    );
}

export default WebsiteCard;