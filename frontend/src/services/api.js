import axios from "axios";

const api = axios.create({
    baseURL: "https://seo-analyzer-lbi9.onrender.com/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;