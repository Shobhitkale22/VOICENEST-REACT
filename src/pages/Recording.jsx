import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../components/common/Logo";
import Button from "../components/common/Button";

import RecordingStatus from "../components/recording/RecordingStatus";
import TimerCard from "../components/recording/TimerCard";
import SecurityCard from "../components/recording/SecurityCard";

import {
    startRecording,
    stopRecording
} from "../services/recorderService";

function Recording() {

    const navigate = useNavigate();

    const [seconds, setSeconds] = useState(0);

    const [status] = useState("Recording...");

    const timerRef = useRef(null);

    // Start recording when page loads
    useEffect(() => {

        async function beginRecording() {

            try {

                await startRecording();

                timerRef.current = setInterval(() => {

                    setSeconds((prev) => prev + 1);

                }, 1000);

            }

            catch (error) {

                alert("Microphone permission denied.");

                navigate("/");

            }

        }

        beginRecording();

        return () => {

            clearInterval(timerRef.current);

        };

    }, [navigate]);

    // Format timer
    const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");

    const remainingSeconds = String(seconds % 60).padStart(2, "0");

    const formattedTime = `${minutes}:${remainingSeconds}`;

    // Stop Recording
    async function handleStopRecording() {

        clearInterval(timerRef.current);

        const audio = await stopRecording();

        navigate("/save", {

            state: {

                audioBlob: audio.blob,

                audioURL: audio.url,

                duration: formattedTime

            }

        });

    }

    return (

        <div className="page-container">

            <Logo />

            <RecordingStatus

                status={status}

            />

            <TimerCard

                time={formattedTime}

            />

            <Button

                text="⏸ Pause Recording"

            />

            <Button

                text="⏹ Stop Recording"

                onClick={handleStopRecording}

            />

            <SecurityCard

                title="🔒 Secure Recording"

                message="Your recording is being encrypted."

            />

        </div>

    );

}

export default Recording;