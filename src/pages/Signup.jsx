import "../styles/signup.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../components/common/Logo";
import Button from "../components/common/Button";
import InputCard from "../components/common/InputCard";

import { signup } from "../services/authService";

function Signup() {

    const navigate = useNavigate();

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    async function handleSignup() {

        if (
            name.trim() === "" ||
            email.trim() === "" ||
            password.trim() === "" ||
            confirmPassword.trim() === ""
        ) {

            alert("Please fill all the fields.");

            return;

        }

        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;

        }

        try {

            const result = await signup({

                name,

                email,

                password

            });

            alert(result.message);

            navigate("/");

        }

        catch (error) {

            console.error(error);

            alert(error.message);

        }

    }

    return (

        <div className="page-container signup-page">

            <Logo />

            <h2 className="signup-title">

                Create Your VoiceNest Account 

            </h2>

            <p className="signup-subtitle">

                Secure your recordings with end-to-end encryption.

            </p>

            <InputCard

                icon=""

                label="Full Name"

                placeholder="Enter your full name"

                value={name}

                onChange={(e) => setName(e.target.value)}

            />

            <InputCard

                icon=""

                label="Email Address"

                placeholder="Enter your email"

                value={email}

                onChange={(e) => setEmail(e.target.value)}

            />

            <InputCard

                icon=""

                label="Password"

                type="password"

                placeholder="Create a password"

                value={password}

                onChange={(e) => setPassword(e.target.value)}

            />

            <InputCard

                icon=""

                label="Confirm Password"

                type="password"

                placeholder="Confirm your password"

                value={confirmPassword}

                onChange={(e) => setConfirmPassword(e.target.value)}

            />

            <Button

                text="Create Account"

                onClick={handleSignup}

            />

            <p className="login-link">

                Already have an account?

                <Link to="/">

                    Login

                </Link>

            </p>

        </div>

    );

}

export default Signup;