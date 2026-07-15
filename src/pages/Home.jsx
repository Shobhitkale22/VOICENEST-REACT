import { useNavigate } from "react-router-dom";

import Logo from "../components/common/Logo";
import Button from "../components/common/Button";
import Card from "../components/common/Card";

function Home() {

    const navigate = useNavigate();

    return (

        <div className="page-container home-page">

            <Logo />

            <div className="home-buttons">

                <Button
                    text="🎙 Start Recording"
                    onClick={() => navigate("/recording")}
                />

                <Button
                    text="📂 My Recordings"
                    onClick={() => navigate("/recordings")}
                />

                <Button
                    text="⚙ Settings"
                    onClick={() => navigate("/settings")}
                />

            </div>

            <Card>

                <h3>✨ VoiceNest Features</h3>

                <div className="feature-list">

                    <p>🔒 End-to-End Encryption</p>

                    <p>🎯 Private Cloud Storage</p>

                    <p>🤖 AI Speech Transcription</p>

                    <p>👥 Secure Sharing</p>

                </div>

            </Card>

        </div>

    );

}

export default Home;