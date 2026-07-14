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

            <h3>{title}</h3>

            <p>⏱ Duration : {duration}</p>

            <p>📅 {createdAt}</p>

            <div
                style={{

                    display: "flex",

                    flexDirection: "column",

                    gap: "10px",

                    marginTop: "20px"

                }}
            >

                <Button

                    text="👁 View"

                    onClick={() => navigate(`/details/${id}`)}

                />

                <Button

                    text="🗑 Delete"

                    onClick={() => onDelete(id)}

                />

            </div>

        </Card>

    );

}

export default RecordingCard;