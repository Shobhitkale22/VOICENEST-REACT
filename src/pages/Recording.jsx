import { useState } from "react";

import Logo from "../components/common/Logo";
import Button from "../components/common/Button";

import RecordingStatus from "../components/recording/RecordingStatus";
import TimerCard from "../components/recording/TimerCard";
import SecurityCard from "../components/recording/SecurityCard";

function Recording() {

    const [time] = useState("00:00");

    const [status] = useState("Recording...");

    const pauseButtonText = "⏸ Pause Recording";

    const stopButtonText = "⏹ Stop Recording";

    return (

        <div className="page-container">

            <Logo />

            <RecordingStatus

                status={status}

            />

            <TimerCard

                time={time}

            />

            <Button

                text={pauseButtonText}

            />

            <Button

                text={stopButtonText}

            />

            <SecurityCard

                title="🔒 Secure Recording"

                message="Your recording is being encrypted."

            />

        </div>

    );

}

export default Recording;