import Button from "./Button";
import { useNavigate } from "react-router-dom";

function EmptyState({

    message

}) {

    const navigate = useNavigate();

    return (

        <div className="empty-state">

            <div className="empty-icon">

                🎤

            </div>

            <h3>

                No Recordings Yet

            </h3>

            <p>

                {message}

            </p>

            <Button

                text="➕ Start Recording"

                onClick={() => navigate("/recording")}

            />

        </div>

    );

}

export default EmptyState;