let mediaRecorder = null;
let audioChunks = [];
let stream = null;

export async function startRecording() {

    stream = await navigator.mediaDevices.getUserMedia({
        audio: true
    });

    // Let browser choose the best supported MIME type
    const options = {};

    if (
        MediaRecorder.isTypeSupported(
            "audio/webm;codecs=opus"
        )
    ) {

        options.mimeType = "audio/webm;codecs=opus";

    }

    else if (
        MediaRecorder.isTypeSupported(
            "audio/webm"
        )
    ) {

        options.mimeType = "audio/webm";

    }

    mediaRecorder = new MediaRecorder(
        stream,
        options
    );

    console.log(
        "Recorder MIME Type:",
        mediaRecorder.mimeType
    );

    audioChunks = [];

    mediaRecorder.ondataavailable = (event) => {

        console.log(
            "Chunk Size:",
            event.data.size
        );

        if (event.data.size > 0) {

            audioChunks.push(event.data);

        }

    };

    mediaRecorder.onerror = (event) => {

        console.error(
            "Recorder Error:",
            event
        );

    };

    mediaRecorder.onstart = () => {

        console.log("Recording Started");

    };

    mediaRecorder.onstop = () => {

        console.log("Recording Stopped");

    };

    mediaRecorder.start(1000);

}

export function stopRecording() {

    return new Promise((resolve) => {

        mediaRecorder.onstop = () => {

            console.log(
                "Chunks Collected:",
                audioChunks.length
            );

            // If browser returns empty MIME type,
            // fall back to audio/webm
            const mimeType =
                mediaRecorder.mimeType || "audio/webm";

            console.log(
                "Using MIME Type:",
                mimeType
            );

            const audioBlob = new Blob(
                audioChunks,
                {
                    type: mimeType
                }
            );

            console.log(
                "Blob:",
                audioBlob
            );

            console.log(
                "Blob Type:",
                audioBlob.type
            );

            console.log(
                "Blob Size:",
                audioBlob.size
            );

            const audioURL =
                URL.createObjectURL(audioBlob);

            console.log(
                "Generated URL:",
                audioURL
            );

            if (stream) {

                stream
                    .getTracks()
                    .forEach(track => track.stop());

            }

            resolve({

                blob: audioBlob,

                url: audioURL

            });

        };

        mediaRecorder.stop();

    });

}