function RecordingStatus({ status }) {

    return (

        <div className="recording-status">

            <div className="record-dot"></div>

            <h2>{status}</h2>

            <p>Your microphone is currently active.</p>

        </div>

    );

}

export default RecordingStatus;