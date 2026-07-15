import "../styles/saverecording.css";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Logo from "../components/common/Logo";
import Button from "../components/common/Button";

import AudioPreviewCard from "../components/recording/AudioPreviewCard";
import RecordingNameCard from "../components/recording/RecordingNameCard";
import EncryptionCard from "../components/recording/EncryptionCard";

import {
    getRecordingById,
    updateRecording
} from "../services/databaseService";

function SaveRecording() {

    const navigate = useNavigate();

    const location = useLocation();

    const recordingId = location.state?.recordingId;

    const [recording, setRecording] = useState(null);

    const [recordingName, setRecordingName] = useState("");

    const [audioURL, setAudioURL] = useState("");

    useEffect(() => {

        let url = "";

        async function loadRecording() {

            try {

                if (!recordingId) {

                    navigate("/");

                    return;

                }

                const data = await getRecordingById(recordingId);

                console.log("========== INDEXED DB ==========");
                console.log("Recording:", data);
                console.log("Audio Blob:", data?.audioBlob);
                console.log("Blob Type:", data?.audioBlob?.type);
                console.log("Blob Size:", data?.audioBlob?.size);

                if (!data) {

                    navigate("/");

                    return;

                }

                setRecording(data);

                setRecordingName(data.title || "");

                url = URL.createObjectURL(data.audioBlob);

                console.log("Generated Blob URL:", url);

                setAudioURL(url);

            }

            catch (error) {

                console.error("Load Recording Error:", error);

            }

        }

        loadRecording();

        return () => {

            if (url) {

                URL.revokeObjectURL(url);

            }

        };

    }, [recordingId, navigate]);

    function handleNameChange(event) {

        setRecordingName(event.target.value);

    }

    async function saveRecording() {

        if (recordingName.trim() === "") {

            alert("Please enter a recording name.");

            return;

        }

        const updatedRecording = {

            ...recording,

            title: recordingName

        };

        await updateRecording(updatedRecording);

        alert("Recording Saved Successfully!");

        navigate("/recordings");

    }

    function discardRecording() {

        if (window.confirm("Discard this recording?")) {

            navigate("/");

        }

    }

    return (

        <div className="page-container" save-page>

            <Logo />

            <h2 className="save-title">
    ✅ Recording Complete
</h2>

<p className="save-subtitle">
    Give your recording a meaningful name before saving.
</p>

            <AudioPreviewCard

                duration={recording?.duration || "00:00"}

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