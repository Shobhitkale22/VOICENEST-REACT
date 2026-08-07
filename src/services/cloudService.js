const API_URL =
    "http://localhost:5000/api/cloud";


// ========================================
// UPLOAD CLOUD RECORDING
// ========================================

export async function uploadCloudRecording(recording) {

    const formData =
        new FormData();


    // Encrypted audio

    formData.append(
        "recording",
        recording.encryptedBlob,
        "recording.enc"
    );


    // Recording information

    formData.append(
        "title",
        recording.title || ""
    );

    formData.append(
        "duration",
        recording.duration || ""
    );

    formData.append(
        "transcript",
        recording.transcript || ""
    );


    // User

    formData.append(
        "userId",
        recording.userId
    );


    // Local recording ID

    formData.append(
        "localRecordingId",
        recording.localRecordingId
    );


    // ========================================
    // AES KEY → BASE64
    // ========================================

    const keyArray =
        new Uint8Array(
            recording.key
        );

    const keyBase64 =
        btoa(
            String.fromCharCode(
                ...keyArray
            )
        );

    formData.append(
        "encryptionKey",
        keyBase64
    );


    // ========================================
    // IV → BASE64
    // ========================================

    const ivArray =
        new Uint8Array(
            recording.iv
        );

    const ivBase64 =
        btoa(
            String.fromCharCode(
                ...ivArray
            )
        );

    formData.append(
        "iv",
        ivBase64
    );


    // ========================================
    // SEND TO BACKEND
    // ========================================

    const response =
        await fetch(
            `${API_URL}/upload`,
            {
                method: "POST",
                body: formData
            }
        );


    if (!response.ok) {

        const errorText =
            await response.text();

        console.error(
            "Cloud Upload Error:",
            errorText
        );

        throw new Error(
            "Cloud upload failed."
        );

    }


    return await response.json();

}


// ========================================
// GET USER CLOUD RECORDINGS
// ========================================

export async function getCloudRecordings(
    userId
) {

    const response =
        await fetch(
            `${API_URL}/recordings/${userId}`
        );


    if (!response.ok) {

        throw new Error(
            "Unable to fetch cloud recordings."
        );

    }


    return await response.json();

}


// ========================================
// GET SINGLE CLOUD RECORDING
// ========================================

export async function getCloudRecording(
    id
) {

    const response =
        await fetch(
            `${API_URL}/recording/${id}`
        );


    if (!response.ok) {

        throw new Error(
            "Unable to fetch cloud recording."
        );

    }


    return await response.json();

}


// ========================================
// DOWNLOAD ENCRYPTED CLOUD RECORDING
// ========================================

export async function downloadCloudRecording(
    id
) {

    const response =
        await fetch(
            `${API_URL}/recording/${id}/file`
        );


    if (!response.ok) {

        const errorText =
            await response.text();

        console.error(
            "Cloud Download Error:",
            errorText
        );

        throw new Error(
            "Unable to download cloud recording."
        );

    }


    return await response.blob();

}