import "../styles/recording.css";

import {
    useEffect,
    useRef,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import Logo from "../components/common/Logo";
import Button from "../components/common/Button";

import RecordingStatus
    from "../components/recording/RecordingStatus";

import TimerCard
    from "../components/recording/TimerCard";

import SecurityCard
    from "../components/recording/SecurityCard";

import {
    startRecording,
    stopRecording
} from "../services/recorderService";

import {
    saveRecording as saveRecordingToDB
} from "../services/databaseService";

import {
    uploadRecording
} from "../services/apiService";

import {
    generateAESKey,
    encryptBlob,
    exportAESKey
} from "../services/encryptionService";


function Recording() {

    const navigate = useNavigate();

    const [seconds, setSeconds] = useState(0);

    const [status] = useState(
        "Recording..."
    );

    const timerRef = useRef(null);


    // ==========================================
    // START RECORDING
    // ==========================================

    useEffect(() => {

        async function beginRecording() {

            try {

                await startRecording();

                console.log(
                    "Recording Started"
                );

                timerRef.current =
                    setInterval(() => {

                        setSeconds(
                            (prev) => prev + 1
                        );

                    }, 1000);

            }

            catch (error) {

                console.error(
                    "Recording Start Error:",
                    error
                );

                alert(
                    "Microphone permission denied."
                );

                navigate("/");

            }

        }

        beginRecording();


        return () => {

            clearInterval(
                timerRef.current
            );

        };

    }, [navigate]);


    // ==========================================
    // TIMER
    // ==========================================

    const minutes = String(

        Math.floor(
            seconds / 60
        )

    ).padStart(2, "0");


    const remainingSeconds = String(

        seconds % 60

    ).padStart(2, "0");


    const formattedTime =
        `${minutes}:${remainingSeconds}`;


    // ==========================================
    // STOP RECORDING
    // ==========================================

    async function handleStopRecording() {

        clearInterval(
            timerRef.current
        );


        try {

            // ----------------------------------
            // STOP AUDIO RECORDING
            // ----------------------------------

            const audio =
                await stopRecording();


            console.log(
                "Recording Finished"
            );

            console.log(
                "Audio Blob:",
                audio.blob
            );


            // ----------------------------------
            // GENERATE TRANSCRIPT
            // ----------------------------------

            console.log(
                "Uploading to Whisper..."
            );


            const uploadResponse =
                await uploadRecording(

                    audio.blob

                );


            console.log(
                "Transcript Generated:"
            );


            console.log(
                uploadResponse.transcript
            );


            // ----------------------------------
            // GENERATE AES-256 KEY
            // ----------------------------------

            const key =
                await generateAESKey();


            console.log(
                "AES-256 CryptoKey Generated:",
                key
            );


            // ----------------------------------
            // ENCRYPT AUDIO
            // ----------------------------------

            const {
                encryptedBlob,
                iv
            } = await encryptBlob(

                audio.blob,

                key

            );


            console.log(
                "Audio Encrypted Successfully"
            );


            console.log(
                "Encrypted Blob:",
                encryptedBlob
            );


            // ----------------------------------
            // EXPORT AES KEY
            // ----------------------------------

            const exportedKey =
                await exportAESKey(key);


            // Convert ArrayBuffer → Uint8Array
            // for reliable IndexedDB storage

            const rawKey =
                new Uint8Array(
                    exportedKey
                );


            console.log(
                "AES Raw Key:",
                rawKey
            );


            // ----------------------------------
            // CREATE RECORDING ID
            // ----------------------------------

            const recordingId =
                Date.now();


            // ----------------------------------
            // CREATE RECORDING OBJECT
            // ----------------------------------

            const recording = {

                id: recordingId,

                title: "",

                duration:
                    formattedTime,

                createdAt:
                    new Date()
                        .toLocaleString(),

                transcript:
                    uploadResponse.transcript,

                encryptedBlob:
                    encryptedBlob,

                iv:
                    new Uint8Array(iv),

                key:
                    rawKey

            };


            console.log(
                "========== RECORDING OBJECT =========="
            );


            console.log(
                recording
            );


            // ----------------------------------
            // SAVE TO INDEXEDDB
            // ----------------------------------

            await saveRecordingToDB(
                recording
            );


            console.log(
                "========== AES ENCRYPTION =========="
            );


            console.log(
                "Encrypted Blob:",
                encryptedBlob
            );


            console.log(
                "IV:",
                recording.iv
            );


            console.log(
                "Raw AES Key:",
                recording.key
            );


            console.log(
                "Recording Saved To IndexedDB"
            );


            // ----------------------------------
            // GO TO SAVE SCREEN
            // ----------------------------------

            navigate(

                "/save",

                {

                    state: {

                        recordingId:
                            recordingId

                    }

                }

            );

        }

        catch (error) {

            console.error(
                "Recording Save Error:",
                error
            );

            alert(
                "Unable to save recording."
            );

        }

    }


    // ==========================================
    // UI
    // ==========================================

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
                text=" Pause Recording"
                disabled
            />


            <Button
                text=" Stop Recording"
                variant="danger"
                onClick={
                    handleStopRecording
                }
            />


            <SecurityCard

                title=" Secure Recording"

                message={
                    "Your recording is being encrypted."
                }

            />

        </div>

    );

}


export default Recording;