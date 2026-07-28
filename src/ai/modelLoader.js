import { pipeline } from "@huggingface/transformers";

let whisperPipeline = null;

export async function loadWhisperModel() {

    if (whisperPipeline) {

        return whisperPipeline;

    }

    console.log("🧠 Loading Whisper model...");

    whisperPipeline = await pipeline(

        "automatic-speech-recognition",

        "Xenova/whisper-tiny.en"

    );

    console.log("✅ Whisper model loaded successfully!");

    return whisperPipeline;

}