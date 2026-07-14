function RecordingInfo({

    title,

    duration,

    createdAt

}){

    return(

        <div className="record-info-card">

            <h2>{title}</h2>

            <p>

                📅 {createdAt}

            </p>

            <p>

                ⏱ Duration : {duration}

            </p>

            <p>

                🔒 AES-256 Encrypted

            </p>

        </div>

    );

}

export default RecordingInfo;