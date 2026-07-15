import "../styles/recording.css";
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

import {
    saveRecording as saveRecordingToDB
} from "../services/databaseService";

function Recording() {

    const navigate = useNavigate();

    const [seconds, setSeconds] = useState(0);

    const [status] = useState("Recording...");

    const timerRef = useRef(null);

    useEffect(() => {

        async function beginRecording() {

            try {

                await startRecording();

                timerRef.current = setInterval(() => {

                    setSeconds((prev) => prev + 1);

                }, 1000);

            }

            catch (error) {

                console.error(error);

                alert("Microphone permission denied.");

                navigate("/");

            }

        }

        beginRecording();

        return () => {

            clearInterval(timerRef.current);

        };

    }, [navigate]);

    const minutes = String(
        Math.floor(seconds / 60)
    ).padStart(2, "0");

    const remainingSeconds = String(
        seconds % 60
    ).padStart(2, "0");

    const formattedTime =
        `${minutes}:${remainingSeconds}`;

    async function handleStopRecording() {

        clearInterval(timerRef.current);

        try {

            const audio = await stopRecording();

            const recordingId = Date.now();

            const recording = {

                id: recordingId,

                title: "",

                duration: formattedTime,

                createdAt: new Date().toLocaleString(),

                audioBlob: audio.blob

            };

            await saveRecordingToDB(recording);

            navigate("/save", {

                state: {

                    recordingId: recordingId

                }

            });

        }

        catch (error) {

            console.error(error);

            alert("Unable to save recording.");

        }

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
                disabled
            />

            <Button

                text="⏹ Stop Recording"
                variant="danger"
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