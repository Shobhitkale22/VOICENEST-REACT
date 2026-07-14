import Card from "../common/Card";

function AudioPreviewCard({ duration, audioURL }) {

    return (

        <Card>

            <h2>▶ Audio Preview</h2>

            {audioURL && (

                <audio
                    controls
                    src={audioURL}
                    preload="metadata"
                    style={{
                        width: "100%",
                        margin: "15px 0"
                    }}
                />

            )}

            <p>

                Duration : {duration}

            </p>

        </Card>

    );

}

export default AudioPreviewCard;