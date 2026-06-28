import { useState } from "react";

function URLForm({ onAnalyze }) {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!url || loading) return;

        setLoading(true);

        try {
        await onAnalyze(url);
        } finally {
        setLoading(false);
        }
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

            <button
                type="submit"
                disabled={loading}
            >
                {loading ? "Analyzing..." : "Analyze"}
            </button>
        </form>
    );
}

export default URLForm;