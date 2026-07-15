import Card from "../common/Card";

function AudioPreviewCard({

    duration,

    audioURL

}) {

    return (

        <Card className="audio-preview-card">

            <h2>

                ▶ Audio Preview

            </h2>

            {

                audioURL &&

                <audio

                    controls

                    preload="metadata"

                    src={audioURL}

                />

            }

            <p>

                Duration : {duration}

            </p>

        </Card>

    );

}

export default AudioPreviewCard;