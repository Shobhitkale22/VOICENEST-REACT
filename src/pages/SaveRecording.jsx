import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Logo from "../components/common/Logo";
import Button from "../components/common/Button";

import AudioPreviewCard from "../components/recording/AudioPreviewCard";
import RecordingNameCard from "../components/recording/RecordingNameCard";
import EncryptionCard from "../components/recording/EncryptionCard";

function SaveRecording() {

    const [recordingName, setRecordingName] = useState("");

    const navigate = useNavigate();

    const location = useLocation();

    // Receive data from Recording.jsx
    const audioBlob = location.state?.audioBlob || null;

const audioURL = audioBlob
    ? URL.createObjectURL(audioBlob)
    : "";
   
    const audioBlob = location.state?.audioBlob || null;

    const duration = location.state?.duration || "00:00";

    function handleNameChange(event) {

        setRecordingName(event.target.value);

    }

    function saveRecording() {

        if (recordingName.trim() === "") {

            alert("Please enter a recording name.");

            return;

        }

        const recording = {

            id: Date.now(),

            title: recordingName,

            duration: duration,

            createdAt: new Date().toLocaleString(),

            audioURL: audioURL,

            audioBlob: audioBlob

        };

        const recordings =
            JSON.parse(localStorage.getItem("recordings")) || [];

        recordings.push(recording);

        localStorage.setItem(
            "recordings",
            JSON.stringify(recordings)
        );

        alert("Recording Saved Successfully!");

        navigate("/recordings");

    }

    function discardRecording() {

        const confirmDiscard = window.confirm(
            "Are you sure you want to discard this recording?"
        );

        if (confirmDiscard) {

            navigate("/");

        }

    }

    return (

        <div className="page-container">

            <Logo />

            <h2>
                ✅ Recording Complete
            </h2>

            <AudioPreviewCard

                duration={duration}

                audioURL={audioURL}

            />

            <RecordingNameCard

                value={recordingName}

                onChange={handleNameChange}

            />

            <EncryptionCard />

            <Button

                text="💾 Save Recording"

                onClick={saveRecording}

            />

            <Button

                text="🗑 Discard Recording"

                onClick={discardRecording}

            />

        </div>

    );

}

export default SaveRecording;