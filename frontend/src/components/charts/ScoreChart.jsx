import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

function ScoreChart({ score }) {

    if (!score) return null;

    const data = {

        labels: [

            "Technical",

            "On Page",

            "Content",

            "Performance"

        ],

        datasets: [
            {
                label: "SEO Scores",
                data: [

                    score.technical_score,

                    score.on_page_score,

                    score.content_score,

                    score.performance_score,

                ],
            },
        ],

    };

    const options = {

        responsive: true,

        scales: {

            y: {

                beginAtZero: true,

                max: 100,

            },

        },

    };

    return (

        <div className="dashboard-card chart-card">

            <h2>📈 Score Breakdown</h2>

            <Bar data={data} options={options} />

        </div>

    );

}

export default ScoreChart;