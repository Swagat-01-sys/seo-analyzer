function PerformanceCard({ performance }) {

    if (!performance) return null;

    const lighthouse = performance.lighthouse || {};

    return (

        <div className="dashboard-card">

            <h2>⚡ Performance</h2>

            <div className="performance-item">
                <span>Response Time</span>
                <strong>{performance.response_time_seconds} s</strong>
            </div>

            <div className="performance-item">
                <span>Page Size</span>
                <strong>{performance.page_size_kb} KB</strong>
            </div>

            <div className="performance-item">
                <span>Server</span>
                <strong>{performance.server}</strong>
            </div>

            <div className="performance-item">
                <span>Compression</span>
                <strong>{performance.compression}</strong>
            </div>

            <div className="performance-item">
                <span>Performance Score</span>
                <strong>{lighthouse.performance_score ?? "Pending"}</strong>
            </div>

            <div className="performance-item">
                <span>Accessibility</span>
                <strong>{lighthouse.accessibility_score ?? "Pending"}</strong>
            </div>

            <div className="performance-item">
                <span>Best Practices</span>
                <strong>{lighthouse.best_practices_score ?? "Pending"}</strong>
            </div>

            <div className="performance-item">
                <span>Lighthouse SEO</span>
                <strong>{lighthouse.seo_score ?? "Pending"}</strong>
            </div>

            <div className="performance-item">
                <span>First Contentful Paint</span>
                <strong>{lighthouse.first_contentful_paint ?? "Pending"}</strong>
            </div>

            <div className="performance-item">
                <span>Largest Contentful Paint</span>
                <strong>{lighthouse.largest_contentful_paint ?? "Pending"}</strong>
            </div>

            <div className="performance-item">
                <span>Speed Index</span>
                <strong>{lighthouse.speed_index ?? "Pending"}</strong>
            </div>

            <div className="performance-item">
                <span>Total Blocking Time</span>
                <strong>{lighthouse.total_blocking_time ?? "Pending"}</strong>
            </div>

            <div className="performance-item">
                <span>Cumulative Layout Shift</span>
                <strong>{lighthouse.cumulative_layout_shift ?? "Pending"}</strong>
            </div>

        </div>

    );

}

export default PerformanceCard;