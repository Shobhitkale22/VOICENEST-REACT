import { useState } from "react";

import Logo from "../components/common/Logo";
import Button from "../components/common/Button";

import AudioPreviewCard from "../components/recording/AudioPreviewCard";
import RecordingNameCard from "../components/recording/RecordingNameCard";
import EncryptionCard from "../components/recording/EncryptionCard";

function SaveRecording() {

    const [recordingName, setRecordingName] = useState("");

    const duration = "00:00";

    function handleNameChange(event) {

        setRecordingName(event.target.value);

    }

    function saveRecording() {

        alert("Recording Saved!");

    }

    function discardRecording() {

        alert("Recording Discarded!");

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