import {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import PageHeader
    from "../components/common/PageHeader";

import Button
    from "../components/common/Button";

import RecordingInfo
    from "../components/details/RecordingInfo";

import AudioPlayer
    from "../components/details/AudioPlayer";

import FeatureButton
    from "../components/details/FeatureButton";


import {
    getRecordingById
} from "../services/databaseService";


import {
    decryptBlob
} from "../services/encryptionService";


import {
    uploadCloudRecording,
    getCloudRecordings
} from "../services/cloudService";


import {
    shareRecording
} from "../services/shareService";


function Details() {

    const navigate =
        useNavigate();


    const { id } =
        useParams();


    const [recording, setRecording] =
        useState(null);


    const [audioURL, setAudioURL] =
        useState("");


    useEffect(() => {

        let url = "";


        async function loadRecording() {

            try {

                const selectedRecording =
                    await getRecordingById(
                        Number(id)
                    );


                if (!selectedRecording) {

                    alert(
                        "Recording not found."
                    );

                    navigate(
                        "/recordings"
                    );

                    return;

                }


                const decryptedBlob =
                    await decryptBlob(

                        selectedRecording.encryptedBlob,

                        selectedRecording.key,

                        selectedRecording.iv

                    );


                url =
                    URL.createObjectURL(
                        decryptedBlob
                    );


                setAudioURL(
                    url
                );


                setRecording(
                    selectedRecording
                );

            }

            catch (error) {

                console.error(
                    "Load Recording Error:",
                    error
                );

                alert(
                    "Unable to load recording."
                );

            }

        }


        loadRecording();


        return () => {

            if (url) {

                URL.revokeObjectURL(
                    url
                );

            }

        };

    }, [
        id,
        navigate
    ]);


    // ========================================
    // UPLOAD TO CLOUD
    // ========================================

    async function uploadToCloud() {

        try {

            if (!recording) {

                alert(
                    "Recording is not loaded."
                );

                return;

            }


            const user =
                JSON.parse(

                    localStorage.getItem(
                        "user"
                    )

                );


            if (!user) {

                alert(
                    "User not found. Please login again."
                );

                return;

            }


            const cloudRecording = {

                userId:
                    user.id,

                localRecordingId:
                    recording.id,

                title:
                    recording.title || "",

                duration:
                    recording.duration || "",

                transcript:
                    recording.transcript || "",

                encryptedBlob:
                    recording.encryptedBlob,

                // RAW AES KEY
                key:
                    recording.key,

                // AES-GCM IV
                iv:
                    recording.iv

            };


            const response =
                await uploadCloudRecording(
                    cloudRecording
                );


            console.log(
                "Cloud Upload Response:",
                response
            );


            alert(
                "Recording uploaded to Private Cloud successfully."
            );

        }

        catch (error) {

            console.error(
                "Cloud Upload Error:",
                error
            );

            alert(
                "Cloud upload failed."
            );

        }

    }


    // ========================================
    // SHARE RECORDING
    // ========================================

    async function shareRecordingWithUser() {

        const receiverEmail =
            prompt(
                "Enter receiver's email"
            );


        if (
            !receiverEmail ||
            receiverEmail.trim() === ""
        ) {

            return;

        }


        try {

            if (!recording) {

                alert(
                    "Recording is not loaded."
                );

                return;

            }


            const user =
                JSON.parse(

                    localStorage.getItem(
                        "user"
                    )

                );


            if (!user) {

                alert(
                    "User not found."
                );

                return;

            }


            // ========================================
            // CHECK IF RECORDING IS ALREADY IN CLOUD
            // ========================================

            let cloudRecordings =
                await getCloudRecordings(
                    user.id
                );


            let cloudRecording =
                cloudRecordings.find(

                    (item) =>

                        Number(
                            item.localRecordingId
                        ) ===
                        Number(
                            recording.id
                        )

                );


            // ========================================
            // IF NOT IN CLOUD → UPLOAD FIRST
            // ========================================

            if (!cloudRecording) {

                const cloudUpload =
                    await uploadCloudRecording({

                        userId:
                            user.id,

                        localRecordingId:
                            recording.id,

                        title:
                            recording.title || "",

                        duration:
                            recording.duration || "",

                        transcript:
                            recording.transcript || "",

                        encryptedBlob:
                            recording.encryptedBlob,

                        key:
                            recording.key,

                        iv:
                            recording.iv

                    });


                cloudRecording =
                    cloudUpload.recording;

            }


            // ========================================
            // NOW SHARE CLOUD RECORDING ID
            // ========================================

            const response =
                await shareRecording({

                    cloudRecordingId:
                        cloudRecording.id,

                    ownerId:
                        user.id,

                    receiverEmail:
                        receiverEmail.trim()

                });


            console.log(
                "Share Response:",
                response
            );


            alert(
                "Recording shared successfully."
            );

        }

        catch (error) {

            console.error(
                "Sharing Error:",
                error
            );

            alert(
                "Sharing failed."
            );

        }

    }


    // ========================================
    // TRANSCRIPT
    // ========================================

    function viewTranscript() {

        if (
            recording &&
            recording.transcript
        ) {

            alert(
                recording.transcript
            );

        }

        else {

            alert(
                "Transcript not available."
            );

        }

    }


    // ========================================
    // LOADING
    // ========================================

    if (!recording) {

        return (

            <div className="page-container">

                <PageHeader

                    title="Recording Details"

                />

                <p>
                    Loading Recording...
                </p>

            </div>

        );

    }


    return (

        <div className="page-container">

            <PageHeader

                title="Recording Details"

                subtitle={
                    "Manage your secure recording"
                }

            />


            <Button

                text="⬅ Back"

                onClick={() =>
                    navigate(
                        "/recordings"
                    )
                }

            />


            <RecordingInfo

                title={

                    recording.title ||

                    "Untitled Recording"

                }

                duration={
                    recording.duration
                }

                createdAt={
                    recording.createdAt
                }

            />


            <AudioPlayer

                audioURL={
                    audioURL
                }

            />


            <FeatureButton

                text="View Transcript"

                icon="📄"

                onClick={
                    viewTranscript
                }

            />


            <FeatureButton

                text="Upload To Private Cloud"

                icon="☁"

                onClick={
                    uploadToCloud
                }

            />


            <FeatureButton

                text="Share Recording"

                icon="🤝"

                onClick={
                    shareRecordingWithUser
                }

            />

        </div>

    );

}


export default Details;