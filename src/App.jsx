import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Recording from "./pages/Recording";
import SaveRecording from "./pages/SaveRecording";
import MyRecordings from "./pages/MyRecordings";
import Details from "./pages/Details";
import Settings from "./pages/Settings";
import UseRefDemo from "./pages/UseRefDemo";
import CounterDemo from "./pages/CounterDemo";

function App() {
    return (
        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/recording" element={<Recording />} />

                <Route path="/save" element={<SaveRecording />} />

                <Route path="/recordings" element={<MyRecordings />} />

                <Route path="/details/:id" element={<Details />} />

                <Route path="/settings" element={<Settings />} />

                <Route path="/useref" element={<UseRefDemo />} />

                <Route path="/counter" element={<CounterDemo />} />

            </Routes>

        </BrowserRouter>
    );
}

export default App;