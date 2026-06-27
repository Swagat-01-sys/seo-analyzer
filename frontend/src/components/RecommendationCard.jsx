function RecommendationCard({ recommendations }) {

    if (!recommendations) return null;

    return (

        <div className="dashboard-card">

            <h2>💡 Recommendations</h2>

            <ul className="recommendation-list">

                {recommendations.map((item, index) => (

                    <li key={index}>

                        ❌ {item}

                    </li>

                ))}

            </ul>

        </div>

    );

}

export default RecommendationCard;