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

import {
    getCloudRecording,
    downloadCloudRecording
} from "../services/cloudService";


// ========================================
// BASE64 → ARRAY BUFFER
// ========================================

function base64ToArrayBuffer(base64) {

    const binaryString =
        atob(base64);


    const bytes =
        new Uint8Array(
            binaryString.length
        );


    for (
        let i = 0;
        i < binaryString.length;
        i++
    ) {

        bytes[i] =
            binaryString.charCodeAt(i);

    }


    return bytes.buffer;

}


// ========================================
// DECRYPT CLOUD RECORDING
// ========================================

async function decryptCloudBlob(
    encryptedBlob,
    encryptionKey,
    iv
) {

    if (
        !encryptedBlob ||
        !encryptionKey ||
        !iv
    ) {

        throw new Error(
            "Missing encryption data."
        );

    }


    const keyBuffer =
        base64ToArrayBuffer(
            encryptionKey
        );


    const ivBuffer =
        base64ToArrayBuffer(
            iv
        );


    const key =
        await crypto.subtle.importKey(

            "raw",

            keyBuffer,

            {
                name: "AES-GCM"
            },

            false,

            [
                "decrypt"
            ]

        );


    const encryptedData =
        await encryptedBlob.arrayBuffer();


    const decryptedData =
        await crypto.subtle.decrypt(

            {

                name: "AES-GCM",

                iv:
                    new Uint8Array(
                        ivBuffer
                    )

            },

            key,

            encryptedData

        );


    return new Blob(

        [
            decryptedData
        ],

        {
            type:
                "audio/webm"
        }

    );

}


// ========================================
// CLOUD DETAILS
// ========================================

function CloudDetails() {

    const navigate =
        useNavigate();


    const { id } =
        useParams();


    const [recording, setRecording] =
        useState(null);


    const [audioURL, setAudioURL] =
        useState("");


    const [loading, setLoading] =
        useState(true);


    useEffect(() => {

        let url = "";


        async function loadRecording() {

            try {

                console.log(
                    "Loading Cloud Recording ID:",
                    id
                );


                // ==============================
                // GET CLOUD METADATA
                // ==============================

                const data =
                    await getCloudRecording(
                        id
                    );


                console.log(
                    "Cloud Recording Metadata:",
                    data
                );


                if (!data) {

                    throw new Error(
                        "Cloud recording not found."
                    );

                }


                // ==============================
                // DOWNLOAD ENCRYPTED FILE
                // ==============================

                const encryptedBlob =
                    await downloadCloudRecording(
                        id
                    );


                console.log(
                    "Encrypted Cloud Blob:",
                    encryptedBlob
                );


                // ==============================
                // DECRYPT
                // ==============================

                const decryptedBlob =
                    await decryptCloudBlob(

                        encryptedBlob,

                        data.encryptionKey,

                        data.iv

                    );


                console.log(
                    "Decrypted Cloud Blob:",
                    decryptedBlob
                );


                // ==============================
                // CREATE AUDIO URL
                // ==============================

                url =
                    URL.createObjectURL(
                        decryptedBlob
                    );


                setAudioURL(url);

                setRecording(data);

            }

            catch (error) {

                console.error(
                    "Cloud Details Error:",
                    error
                );

                alert(
                    "Unable to open cloud recording."
                );

            }

            finally {

                setLoading(false);

            }

        }


        loadRecording();


        return () => {

            if (url) {

                URL.revokeObjectURL(url);

            }

        };

    }, [id]);


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


    if (loading) {

        return (

            <div className="page-container">

                <PageHeader

                    title="☁ Cloud Details"

                />

                <p>
                    Loading recording...
                </p>

            </div>

        );

    }


    if (!recording) {

        return (

            <div className="page-container">

                <PageHeader

                    title="☁ Cloud Details"

                />

                <p>
                    Unable to load recording.
                </p>


                <Button

                    text="⬅ Back"

                    onClick={() =>
                        navigate("/cloud")
                    }

                />

            </div>

        );

    }


    return (

        <div className="page-container">

            <PageHeader

                title="☁ Cloud Details"

                subtitle={
                    "Encrypted VoiceNest cloud recording"
                }

            />


            <Button

                text="⬅ Back"

                onClick={() =>
                    navigate("/cloud")
                }

            />


            <div className="card">

                <h3>

                    {
                        recording.title ||
                        "Untitled Recording"
                    }

                </h3>


                <p>

                    Duration:{" "}

                    {
                        recording.duration ||
                        "00:00"
                    }

                </p>


                <p>

                    Uploaded:{" "}

                    {
                        recording.uploadedAt ||
                        "Unknown"
                    }

                </p>


                <div
                    style={{
                        marginTop: "20px"
                    }}
                >

                    {

                        audioURL

                        ?

                        (

                            <audio

                                controls

                                src={audioURL}

                                style={{
                                    width:
                                        "100%"
                                }}

                            />

                        )

                        :

                        (

                            <p>
                                Audio unavailable.
                            </p>

                        )

                    }

                </div>

            </div>


            <Button

                text="📄 View Transcript"

                onClick={
                    viewTranscript
                }

            />

        </div>

    );

}


export default CloudDetails;