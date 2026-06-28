import { useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import URLForm from "../components/URLForm";
import ScoreCard from "../components/ScoreCard";
import TechnicalCard from "../components/TechnicalCard";
import PerformanceCard from "../components/PerformanceCard";
import OnPageCard from "../components/OnPageCard";
import MetadataCard from "../components/MetadataCard";
import ContentCard from "../components/ContentCard";
import RecommendationCard from "../components/RecommendationCard";
import WebsiteCard from "../components/WebsiteCard";
import KeywordChart from "../components/charts/KeywordChart";
import ScoreChart from "../components/charts/ScoreChart";
import api from "../services/api";

function Home() {

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    

    const handleAnalyze = async (url) => {
        setLoading(true);
        setResult(null);

    try {

        setResult(null);

        const response = await api.post("/analyze", {
            url,
        });

        const jobId = response.data.job_id;

        console.log("Job Created:", jobId);

        let finished = false;

        while (!finished) {

            await new Promise(resolve => setTimeout(resolve, 1000));

            const report = await api.get(`/results/${jobId}`);

            console.log(report.data);

            if (
                report.data.status === "completed" ||
                report.data.status === "failed"
            ) {
                console.log("===== REPORT =====");
                console.log(report.data);
                console.log("results =", report.data.results);
                console.log("technical =", report.data.results?.technical);
                setResult(report.data);
                setLoading(false);
                finished = true;

            }

        }

    } catch (err) {
        setLoading(false);
        console.error(err);

    }

};
    return (
        <>
            <Navbar />
            <Hero />

            <URLForm onAnalyze={handleAnalyze} />
            {loading && (
                <div className="loading-card">
                    <div className="loading-spinner"></div>

                    <h2>Analyzing Website...</h2>

                    <p>Please wait while we perform the SEO analysis.

                    </p>
                </div>
            )}

            {result && result.results && (

                <div id="features" className="dashboard">

                    <ScoreCard score={result.results.score} />

                    <WebsiteCard result={result} />

                    <TechnicalCard technical={result.results.technical} />

                    <PerformanceCard performance={result.results.performance} />

                    <OnPageCard onPage={result.results.on_page} />

                    <MetadataCard metadata={result.results.metadata} />

                    <ContentCard content={result.results.content} />
                    <ScoreChart score={result.results.score} />

                    <KeywordChart
                    keywords={result.results.content?.top_keywords ?? []}
                    />

                    <RecommendationCard
                    recommendations={
                    result.results.score?.recommendations ?? []
                    }
                    />

            </div>

        )}

        <section id="about" className="about-section">

            <h2>About SEO Analyzer</h2>

            <p>
                 SEO Analyzer is a comprehensive web application that evaluates a website's
                technical SEO, metadata, content quality, on-page optimization, and
                performance. It generates an overall SEO score, highlights strengths
                and weaknesses, and provides actionable recommendations to improve
                search engine visibility and website quality.
            </p>

        </section>

        </>
    );
}

export default Home;