import { useRef } from "react";

function UseRefDemo() {

    const inputRef = useRef(null);

    function focusInput() {
        inputRef.current.focus();
    }

    return (
        <div style={{ padding: "40px" }}>

            <h1>Learning useRef()</h1>

            <input
                ref={inputRef}
                type="text"
                placeholder="Enter your name"
            />

            <br /><br />

            <button onClick={focusInput}>
                Focus Input
            </button>

        </div>
    );
}

export default UseRefDemo;