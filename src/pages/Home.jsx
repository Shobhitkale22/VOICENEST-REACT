import {
    generateAESKey,
    encryptBlob,
    decryptBlob
} from "../services/encryptionService";



import { useEffect } from "react";

import {

    checkBackendHealth

} from "../services/apiService";
import { loadWhisperModel } from "../ai/modelLoader";
import { useNavigate } from "react-router-dom";

import Logo from "../components/common/Logo";
import Button from "../components/common/Button";
import Card from "../components/common/Card";

function Home() {
    useEffect(() => {

    async function testBackend() {

        try {

            const result =

                await checkBackendHealth();

            console.log(

                "Backend Connected:",

                result

            );

        }

        catch (error) {

            console.error(

                "Backend Error:",

                error

            );

        }

    }

    testBackend();

}, []);

    const navigate = useNavigate();

    return (

        <div className="page-container home-page">

            <Logo />

            <div className="home-buttons">

                <Button
                    text=" Start Recording"
                    onClick={() => navigate("/recording")}
                />

                <Button
                    text=" My Recordings"
                    onClick={() => navigate("/recordings")}
                />

                <Button
                    text=" Settings"
                    onClick={() => navigate("/settings")}
                />
             <Button

    text="Test Encryption"

    onClick={testEncryption}

/>

            </div>

            <Card>

                <h3> VoiceNest Features</h3>

                <div className="feature-list">

                    <p> End-to-End Encryption</p>

                    <p> Private Cloud Storage</p>

                    <p> AI Speech Transcription</p>

                    <p> Secure Sharing</p>

                </div>

            </Card>

        </div>

    );

}

async function testAI() {

    try {

        await loadWhisperModel();

        alert("Whisper Loaded Successfully!");

    }

    catch (error) {

        console.error(error);

        alert("Failed to load Whisper!");

    }

}

async function testEncryption() {

    try {

        // Create Dummy Audio

        const originalBlob = new Blob(

            ["Hello VoiceNest"],

            {
                type: "text/plain"
            }

        );

        console.log("Original Blob:", originalBlob);

        // Generate AES Key

        const key = await generateAESKey();

        console.log("AES Key:", key);

        // Encrypt

        const {

            encryptedBlob,

            iv

        } = await encryptBlob(

            originalBlob,

            key

        );

        console.log(

            "Encrypted Blob:",

            encryptedBlob

        );

        // Decrypt

        const decryptedBlob =

            await decryptBlob(

                encryptedBlob,

                key,

                iv

            );

        console.log(

            "Decrypted Blob:",

            decryptedBlob

        );

        const text =

            await decryptedBlob.text();

        console.log(

            "Recovered Text:",

            text

        );

    }

    catch (error) {

        console.error(

            "Encryption Test Failed:",

            error

        );

    }

}

export default Home;