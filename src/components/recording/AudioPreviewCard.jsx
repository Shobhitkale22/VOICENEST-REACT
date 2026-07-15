import Card from "../common/Card";

function AudioPreviewCard({ duration, audioURL }) {

    return (

        <Card>

            <h3>🎵 Preview</h3>

            <audio
                controls
                src={audioURL}
                style={{
                    width:"100%",
                    margin:"20px 0"
                }}
            />

            <p>

                ⏱ Duration : <strong>{duration}</strong>

            </p>

        </Card>

    );

}

export default AudioPreviewCard;