import "../styles/profile.css";

import { useNavigate } from "react-router-dom";

import Logo from "../components/common/Logo";
import Button from "../components/common/Button";

function Profile() {

    const navigate = useNavigate();

    function handleLogout() {

        localStorage.removeItem("token");

        navigate("/");

    }

    return (

        <div className="page-container profile-page">

            <Logo />

            <div className="profile-avatar">

                👤

            </div>

            <h2>

                Shobhit Kale

            </h2>

            <p>

                shobhit@example.com

            </p>

            <div className="profile-card">

                <h3>Email</h3>

                <p>shobhit@example.com</p>

            </div>

            <div className="profile-card">

                <h3>Security</h3>

                <p>AES-256 Encryption Enabled</p>

            </div>

            <div className="profile-card">

                <h3>Cloud</h3>

                <p>Not Connected</p>

            </div>

            <Button

                text="Logout"

                variant="danger"

                onClick={handleLogout}

            />

        </div>

    );

}

export default Profile;