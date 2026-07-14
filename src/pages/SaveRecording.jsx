import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Logo from "../components/common/Logo";
import Button from "../components/common/Button";

import AudioPreviewCard from "../components/recording/AudioPreviewCard";
import RecordingNameCard from "../components/recording/RecordingNameCard";
import EncryptionCard from "../components/recording/EncryptionCard";

import {
    saveRecording as saveRecordingToDB
} from "../services/databaseService";

function SaveRecording() {

    const [recordingName, setRecordingName] = useState("");

    const navigate = useNavigate();

    const location = useLocation();

    // Receive recording data from Recording.jsx
    const audioBlob = location.state?.audioBlob || null;
    console.log(audioBlob);

console.log(audioBlob instanceof Blob);

console.log(audioBlob?.type);

console.log(audioBlob?.size);

    // Create a fresh Blob URL
    const audioURL = audioBlob
        ? URL.createObjectURL(audioBlob)
        : "";
        console.log(audioURL);

    const duration = location.state?.duration || "00:00";

    function handleNameChange(event) {

        setRecordingName(event.target.value);

    }

    async function saveRecording() {

        if (recordingName.trim() === "") {

            alert("Please enter a recording name.");

            return;

        }

        if (!audioBlob) {

            alert("No recording found.");

            return;

        }

        const recording = {

            id: Date.now(),

            title: recordingName,

            duration: duration,

            createdAt: new Date().toLocaleString(),

            audioBlob: audioBlob

        };

        try {

            await saveRecordingToDB(recording);

            alert("Recording Saved Successfully!");

            navigate("/recordings");

        }

        catch (error) {

            console.error(error);

            alert("Failed to save recording.");

        }

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