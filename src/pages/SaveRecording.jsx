import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../components/common/Logo";
import Button from "../components/common/Button";

import AudioPreviewCard from "../components/recording/AudioPreviewCard";
import RecordingNameCard from "../components/recording/RecordingNameCard";
import EncryptionCard from "../components/recording/EncryptionCard";

function SaveRecording() {

    const [recordingName, setRecordingName] = useState("");

    const navigate = useNavigate();

    const duration = "00:00";

    function handleNameChange(event) {

        setRecordingName(event.target.value);

    }

    function saveRecording() {

        // Check if recording name is empty
        if (recordingName.trim() === "") {

            alert("Please enter a recording name.");

            return;

        }

        // Create recording object
        const recording = {

            id: Date.now(),

            title: recordingName,

            duration: duration,

            createdAt: new Date().toLocaleString()

        };

        // Get existing recordings from localStorage
        const recordings =
            JSON.parse(localStorage.getItem("recordings")) || [];

        // Add new recording
        recordings.push(recording);

        // Save updated recordings
        localStorage.setItem(
            "recordings",
            JSON.stringify(recordings)
        );

        alert("Recording Saved Successfully!");

        // Navigate to My Recordings page
        navigate("/recordings");

    }

    function discardRecording() {

        const confirmDiscard = window.confirm(
            "Are you sure you want to discard this recording?"
        );

        if (confirmDiscard) {

            alert("Recording Discarded!");

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