import { useNavigate } from "react-router-dom";

import Card from "../common/Card";
import Button from "../common/Button";

function RecordingCard({

    id,

    title,

    duration,

    createdAt,

    onDelete

}) {

    const navigate = useNavigate();

    return (

        <Card>

            <div className="recording-card">

                <div className="recording-info">

                    <h3>

                        🎤 {title || "Untitled Recording"}

                    </h3>

                    <div className="recording-meta">

                        <span>

                            ⏱ {duration}

                        </span>

                        <span>

                            📅 {createdAt}

                        </span>

                    </div>

                </div>

                <div className="recording-actions">

                    <Button

                        text="▶ View Details"

                        onClick={() => navigate(`/details/${id}`)}

                    />

                    <Button

                        text="🗑 Delete"

                        onClick={() => onDelete(id)}

                    />

                </div>

            </div>

        </Card>

    );

}

export default RecordingCard;