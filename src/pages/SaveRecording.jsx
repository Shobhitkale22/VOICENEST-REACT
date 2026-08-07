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

import {
    decryptBlob
} from "../services/encryptionService";

import {
    uploadCloudRecording
} from "../services/cloudService";

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

                if (!data) {

                    navigate("/");

                    return;

                }

                const decryptedBlob = await decryptBlob(

                    data.encryptedBlob,

                    data.key,

                    data.iv

                );

                console.log("========== AES DECRYPTION ==========");
                console.log("Encrypted Blob:", data.encryptedBlob);
                console.log("Decrypted Blob:", decryptedBlob);

                setRecording(data);

                setRecordingName(data.title || "");

                url = URL.createObjectURL(decryptedBlob);

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

        try {

            const updatedRecording = {

                ...recording,

                title: recordingName

            };

            await updateRecording(updatedRecording);

            alert("Recording Saved Successfully!");

            navigate("/recordings");

        }

        catch (error) {

            console.error(error);

            alert("Failed to save recording.");

        }

    }

    async function handleCloudUpload() {

        if (!recording) {

            return;

        }

        if (recordingName.trim() === "") {

            alert("Please enter a recording name.");

            return;

        }

        try {

            const user = JSON.parse(

                localStorage.getItem("user")

            );

            const cloudRecording = {

                audioBlob: recording.encryptedBlob,

                title: recordingName,

                transcript: recording.transcript,

                duration: recording.duration,

                userId: user.id

            };

            console.log("========== PRIVATE CLOUD ==========");
            console.log(cloudRecording);

            const response = await uploadCloudRecording(

                cloudRecording

            );

            console.log(response);

            alert(

                "Recording uploaded to Private Cloud successfully."

            );

        }

        catch (error) {

            console.error(error);

            alert(error.message);

        }

    }

    function discardRecording() {

        if (window.confirm("Discard this recording?")) {

            navigate("/");

        }

    }

    return (

        <div className="page-container save-recording-page">

            <Logo />

            <h2 className="save-title">

                Recording Complete

            </h2>

            <AudioPreviewCard

                duration={recording?.duration || "00:00"}

                audioURL={audioURL}

            />

            <RecordingNameCard

                value={recordingName}

                onChange={handleNameChange}

            />

            <EncryptionCard />

            <div className="save-buttons">

                <Button

                    text="Save Recording"

                    className="save-btn"

                    onClick={saveRecording}

                />

                <Button

                    text="Upload To Private Cloud"

                    onClick={handleCloudUpload}

                />

                <Button

                    text="Discard Recording"

                    className="discard-btn"

                    onClick={discardRecording}

                />

            </div>

        </div>

    );

}

export default SaveRecording;