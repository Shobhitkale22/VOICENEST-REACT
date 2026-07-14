let mediaRecorder = null;
let audioChunks = [];
let stream = null;

console.log(
    "audio/webm:",
    MediaRecorder.isTypeSupported("audio/webm")
);

console.log(
    "audio/webm;codecs=opus:",
    MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
);

console.log(
    "audio/ogg;codecs=opus:",
    MediaRecorder.isTypeSupported("audio/ogg;codecs=opus")
);

console.log(
    "audio/mp4:",
    MediaRecorder.isTypeSupported("audio/mp4")
);

export async function startRecording(onChunk) {

    stream = await navigator.mediaDevices.getUserMedia({
        audio: true
    });

    // Force WebM + Opus
    mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus"
    });

    audioChunks = [];

    mediaRecorder.ondataavailable = (event) => {

        console.log("Chunk Size:", event.data.size);

        if (event.data.size > 0) {

            audioChunks.push(event.data);

            if (onChunk) {

                onChunk(event.data);

            }

        }

    };

    mediaRecorder.onerror = (event) => {

        console.error("Recorder Error:", event);

    };

    // Emit data every second
    mediaRecorder.start(1000);

}

export function stopRecording() {

    return new Promise((resolve) => {

        mediaRecorder.onstop = () => {

            console.log("Chunks:", audioChunks.length);

            // Create Blob
            const audioBlob = new Blob(audioChunks, {
                type: "audio/webm"
            });

            console.log("Mime Type:", mediaRecorder.mimeType);
            console.log("Blob Size:", audioBlob.size);
            console.log("Blob:", audioBlob);

            const fileReader = new FileReader();

fileReader.onload = function () {

    console.log(fileReader.result);

};

fileReader.readAsDataURL(audioBlob);

            // Create URL
            const audioURL = URL.createObjectURL(audioBlob);

            console.log("Blob URL:", audioURL);

            // Download automatically for testing
            const file = new File(
                [audioBlob],
                "test.webm",
                {
                    type: "audio/webm"
                }
            );

            const link = document.createElement("a");

            link.href = URL.createObjectURL(file);

            link.download = "test.webm";

            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);

            // Stop microphone
            stream.getTracks().forEach(track => track.stop());

            resolve({

                blob: audioBlob,

                url: audioURL

            });

        };

        mediaRecorder.stop();

    });

}