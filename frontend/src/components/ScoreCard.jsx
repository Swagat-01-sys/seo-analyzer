import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function ScoreCard({ score }) {

    if (!score) return null;

    let color = "#22c55e";

    if (score.overall_score < 80)
        color = "#f59e0b";

    if (score.overall_score < 60)
        color = "#ef4444";

    return (

        <div className="dashboard-card score-card">

            <h2>Overall SEO Score</h2>

            <div style={{ width: 180, margin: "30px auto" }}>

                <CircularProgressbar
                    value={score.overall_score}
                    text={`${score.overall_score}`}
                    styles={buildStyles({
                        textSize: "22px",
                        pathColor: color,
                        textColor: "#222",
                        trailColor: "#e5e7eb"
                    })}
                />

            </div>

            <h3
                style={{
                    marginTop: 20,
                    color: color
                }}
            >
                Grade {score.grade}
            </h3>

        </div>

    );

}

export default ScoreCard;