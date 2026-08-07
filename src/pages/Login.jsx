import "../styles/login.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../components/common/Logo";
import Button from "../components/common/Button";
import InputCard from "../components/common/InputCard";

import { login } from "../services/authService";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    async function handleLogin() {

        if (
            email.trim() === "" ||
            password.trim() === ""
        ) {

            alert("Please fill all the fields.");

            return;

        }

        try {

            const result = await login({

                email,

                password

            });

            console.log("Login Response:", result);

            // Save JWT Token
            localStorage.setItem(

                "token",

                result.token

            );

            // Save User Details (optional but useful)
            localStorage.setItem(

                "user",

                JSON.stringify(result.user)

            );

            alert("Login Successful!");

            navigate("/home");

        }

        catch (error) {

            console.error(error);

            alert(error.message);

        }

    }

    return (

        <div className="page-container login-page">

            <Logo />

            <h2 className="login-title">

                Welcome Back 

            </h2>

            <p className="login-subtitle">

                Sign in to continue protecting your voice recordings.

            </p>

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

                placeholder="Enter your password"

                value={password}

                onChange={(e) => setPassword(e.target.value)}

            />

            <p className="forgot-password">

                Forgot Password?

            </p>

            <Button

                text="Login Securely"

                onClick={handleLogin}

            />

            <p className="signup-link">

                Don't have an account?

                <Link to="/signup">

                    Create Account

                </Link>

            </p>

        </div>

    );

}

export default Login;