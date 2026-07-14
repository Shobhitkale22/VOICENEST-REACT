import Card from "../common/Card";
import WaveAnimation from "./WaveAnimation";

function TimerCard({ time }) {

    return (

        <Card>

            <h2 className="timer-text">
                {time}
            </h2>

            <WaveAnimation />

        </Card>

    );

}

export default TimerCard;