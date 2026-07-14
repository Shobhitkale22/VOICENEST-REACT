import Card from "../common/Card";

function AudioPreviewCard({ duration }) {

    return (

        <Card>

            <h2>▶ Audio Preview</h2>

            <p>

                Duration : {duration}

            </p>

        </Card>

    );

}

export default AudioPreviewCard;