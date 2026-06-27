function OnPageCard({ onPage }) {

    if (!onPage) return null;

    return (

        <div className="dashboard-card">

            <h2>📄 On-Page SEO</h2>

            <div className="performance-item">
                <span>Title Length</span>
                <strong>{onPage.title_length}</strong>
            </div>

            <div className="performance-item">
                <span>Description Length</span>
                <strong>{onPage.description_length}</strong>
            </div>

            <div className="performance-item">
                <span>Total Images</span>
                <strong>{onPage.images.total}</strong>
            </div>

            <div className="performance-item">
                <span>Images with ALT</span>
                <strong>{onPage.images.with_alt}</strong>
            </div>

            <div className="performance-item">
                <span>Images without ALT</span>
                <strong>{onPage.images.without_alt}</strong>
            </div>

            <div className="performance-item">
                <span>Internal Links</span>
                <strong>{onPage.links.internal}</strong>
            </div>

            <div className="performance-item">
                <span>External Links</span>
                <strong>{onPage.links.external}</strong>
            </div>

        </div>

    );

}

export default OnPageCard;