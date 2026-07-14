import Card from "../common/Card";

function RecordingNameCard({ value, onChange }) {

    return (

        <Card>

            <h2>Recording Name</h2>

            <input

                type="text"

                placeholder="Enter recording name..."

                value={value}

                onChange={onChange}

                className="record-input"

            />

        </Card>

    );

}

export default RecordingNameCard;