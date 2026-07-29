const API_BASE_URL = "http://localhost:5000";

export async function checkBackendHealth() {

    const response = await fetch(

        `${API_BASE_URL}/api/health`

    );

    if (!response.ok) {

        throw new Error(

            "Backend connection failed."

        );

    }

    return await response.json();

}

export async function uploadRecording(audioBlob) {

    const formData = new FormData();

    formData.append(

        "audio",

        audioBlob,

        "recording.webm"

    );

    const response = await fetch(

        "http://localhost:5000/api/upload",

        {

            method: "POST",

            body: formData

        }

    );

    if (!response.ok) {

        throw new Error(

            "Upload failed."

        );

    }

    return await response.json();

}