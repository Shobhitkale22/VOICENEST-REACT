import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

import Logo from "../components/common/Logo";
import Button from "../components/common/Button";
import Card from "../components/common/Card";

import "../styles/Home.css";

function Home() {

    const navigate = useNavigate();

    function startRecording() {
        navigate("/recording");
    }

    function openRecordings() {
        navigate("/recordings");
    }

    function openSettings() {
        navigate("/settings");
    }

    return (

        <div className="page-container">

            <Card>

                <Logo />

                <div className="home-buttons">

                    <Button
                        text="🎤 Start Recording"
                        onClick={startRecording}
                    />

                    <Button
                        text="📁 My Recordings"
                        onClick={openRecordings}
                    />

                    <Button
                        text="⚙️ Settings"
                        onClick={openSettings}
                    />

                </div>

            </Card>

        </div>

    );

}

export default Home;