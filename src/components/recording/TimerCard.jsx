import Card from "../common/Card";

function TimerCard({ time }) {

    return (

        <Card>

            <div className="timer-card">

                <p>Recording Time</p>

                <h1 className="timer">

                    {time}

                </h1>

            </div>

        </Card>

    );

}

export default TimerCard;