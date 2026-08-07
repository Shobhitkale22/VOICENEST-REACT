const API_URL =
    "http://localhost:5000/api/share";


// ========================================
// SHARE RECORDING
// ========================================

export async function shareRecording(data) {

    const response =
        await fetch(
            API_URL,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify(data)
            }
        );


    if (!response.ok) {

        throw new Error(
            "Unable to share recording."
        );

    }


    return await response.json();

}


// ========================================
// GET SHARED RECORDINGS
// ========================================

export async function getSharedRecordings(
    email
) {

    const response =
        await fetch(
            `${API_URL}/${encodeURIComponent(email)}`
        );


    if (!response.ok) {

        throw new Error(
            "Unable to load shared recordings."
        );

    }


    return await response.json();

}