import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Home from "./pages/Home";
import Recording from "./pages/Recording";
import SaveRecording from "./pages/SaveRecording";
import MyRecordings from "./pages/MyRecordings";
import Details from "./pages/Details";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import CloudRecordings from "./pages/CloudRecordings";
import SharedWithMe from "./pages/SharedWithMe";
import CloudDetails from "./pages/CloudDetails";

import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Public Routes */}

                <Route

                    path="/"

                    element={<Login />}

                />

                <Route

                    path="/signup"

                    element={<Signup />}

                />

                {/* Protected Routes */}

                <Route

                    path="/home"

                    element={

                        <ProtectedRoute>

                            <Home />

                        </ProtectedRoute>

                    }

                />

                <Route

                    path="/recording"

                    element={

                        <ProtectedRoute>

                            <Recording />

                        </ProtectedRoute>

                    }

                />

                <Route

                    path="/save"

                    element={

                        <ProtectedRoute>

                            <SaveRecording />

                        </ProtectedRoute>

                    }

                />

                <Route

                    path="/recordings"

                    element={

                        <ProtectedRoute>

                            <MyRecordings />

                        </ProtectedRoute>

                    }

                />

               <Route

    path="/details/:id"

    element={

        <ProtectedRoute>

            <Details />

        </ProtectedRoute>

    }

/> 
                <Route

                    path="/settings"

                    element={

                        <ProtectedRoute>

                            <Settings />

                        </ProtectedRoute>

                    }

                />

                <Route

                    path="/profile"

                    element={

                        <ProtectedRoute>

                            <Profile />

                        </ProtectedRoute>

                    }

                />

                <Route

    path="/cloud"

    element={

        <ProtectedRoute>

            <CloudRecordings />

        </ProtectedRoute>

    }

/>

<Route

    path="/shared"

    element={

        <ProtectedRoute>

            <SharedWithMe />

        </ProtectedRoute>

    }

/>

<Route

    path="/cloud-details/:id"

    element={

        <ProtectedRoute>

            <CloudDetails />

        </ProtectedRoute>

    }

/>

            </Routes>

        </BrowserRouter>

    );

}

export default App;