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

function KeywordChart({ keywords }) {

    if (!keywords || keywords.length === 0) return null;

    const data = {

        labels: keywords.map(k => k.keyword),

        datasets: [
            {
                label: "Keyword Frequency",
                data: keywords.map(k => k.count),
            },
        ],

    };

    return (

        <div className="dashboard-card chart-card">

            <h2>📊 Top Keywords</h2>

            <Bar data={data} />

        </div>

    );

}

export default KeywordChart;