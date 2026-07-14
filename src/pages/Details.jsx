import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PageHeader from "../components/common/PageHeader";
import Button from "../components/common/Button";

import RecordingInfo from "../components/details/RecordingInfo";
import AudioPlayer from "../components/details/AudioPlayer";
import FeatureButton from "../components/details/FeatureButton";

function Details() {

    const navigate = useNavigate();

    const { id } = useParams();

    const [recording, setRecording] = useState(null);

    useEffect(() => {

        const savedRecordings = JSON.parse(

            localStorage.getItem("recordings")

        ) || [];

        const selectedRecording = savedRecordings.find(

            (item) => String(item.id) === id

        );

        setRecording(selectedRecording);

    }, [id]);

    if (!recording) {

        return (

            <div className="page-container">

                <PageHeader

                    title="Recording Details"

                />

                <p>Recording not found.</p>

                <Button

                    text="⬅ Back"

                    onClick={() => navigate("/my-recordings")}

                />

            </div>

        );

    }

    function comingSoon(feature) {

        alert(feature + " feature coming soon!");

    }

    return (

        <div className="page-container">

            <PageHeader

                title="Recording Details"

                subtitle="View your recording"

            />

            <Button

                text="⬅ Back"

                onClick={() => navigate("/recordings")}

            />

            <RecordingInfo

                title={recording.title}

                duration={recording.duration}

                createdAt={recording.createdAt}

            />

            <AudioPlayer

                audioURL={recording.audioURL}

            />

            <FeatureButton

                text="View Transcript"

                icon="📄"

                onClick={() => comingSoon("Transcript")}

            />

            <FeatureButton

                text="Upload to Private Cloud"

                icon="☁"

                onClick={() => comingSoon("Private Cloud")}

            />

            <FeatureButton

                text="Share with VoiceNest User"

                icon="👥"

                onClick={() => comingSoon("Sharing")}

            />

        </div>

    );

}

export default Details;