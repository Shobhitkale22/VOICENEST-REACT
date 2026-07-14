import Button from "../components/common/Button";
import Card from "../components/common/Card";
import useCounter from "../hooks/useCounter";

function CounterDemo() {

    const {

        count,

        increase,

        decrease,

        reset

    } = useCounter();

    return (

        <div className="home-container">

            <Card>

                <h1>Custom Hook Demo</h1>

                <h2>{count}</h2>

                <div className="home-buttons">

                    <Button
                        text="Increase"
                        onClick={increase}
                    />

                    <Button
                        text="Decrease"
                        onClick={decrease}
                    />

                    <Button
                        text="Reset"
                        onClick={reset}
                    />

                </div>

            </Card>

        </div>

    );

}

export default CounterDemo;