import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

import Home from "./pages/Home";
import Recording from "./pages/Recording";
import SaveRecording from "./pages/SaveRecording";
import MyRecordings from "./pages/MyRecordings";
import Details from "./pages/Details";
import Settings from "./pages/Settings";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Authentication */}

                <Route

                    path="/"

                    element={<Login />}

                />

                <Route

                    path="/signup"

                    element={<Signup />}

                />
                <Route

    path="/profile"

    element={<Profile />}

/>

                {/* VoiceNest */}

                <Route

                    path="/home"

                    element={<Home />}

                />

                <Route

                    path="/recording"

                    element={<Recording />}

                />

                <Route

                    path="/save"

                    element={<SaveRecording />}

                />

                <Route

                    path="/recordings"

                    element={<MyRecordings />}

                />

                <Route

                    path="/details"

                    element={<Details />}

                />

                <Route

                    path="/settings"

                    element={<Settings />}

                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;