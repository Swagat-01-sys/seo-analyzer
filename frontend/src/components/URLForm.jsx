import { useState } from "react";

function URLForm({ onAnalyze }) {
    const [url, setUrl] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!url) return;

        onAnalyze(url);
    };

    return (
        <form className="url-form" onSubmit={handleSubmit}>
            <input
                type="url"
                placeholder="Enter website URL..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
            />

            <button type="submit">
                Analyze
            </button>
        </form>
    );
}

export default URLForm;