import { useNavigate } from "react-router-dom";

import PageHeader from "../components/common/PageHeader";

import SettingsCard from "../components/settings/SettingsCard";
import SettingsButton from "../components/settings/SettingsButton";

function Settings() {

    const navigate = useNavigate();

    function logout() {

        alert("Logout feature coming in Backend.");

    }

    return (

        <div className="page-container">

            <PageHeader

                title="Settings"

                subtitle="Manage your VoiceNest"

            />

            <SettingsCard

                icon="👤"

                title="Account"

            >

                <p>Name : Demo User</p>

                <p>Email : demo@voicenest.ai</p>

                <small>Status : Coming in Backend</small>

            </SettingsCard>

            <SettingsCard

                icon="📱"

                title="VoiceNest"

            >

                <p>Version : v1.0 POC</p>

            </SettingsCard>

            <SettingsCard

                icon="🔒"

                title="Privacy & Security"

            >

                <p>✔ End-to-End Encryption (Planned)</p>

                <p>✔ Share only with Authenticated Users</p>

            </SettingsCard>

            <SettingsCard

                icon="☁"

                title="Cloud Storage"

            >

                <p>Private Cloud</p>

                <small>Status : Not Connected Yet</small>

            </SettingsCard>

            <SettingsCard

                icon="ℹ"

                title="About"

            >

                <p>

                    VoiceNest is a secure voice recording application
                    that allows users to record, encrypt,
                    organize and securely share recordings.

                </p>

            </SettingsCard>

            <SettingsButton

                text="Logout"

                icon="🚪"

                className="logout-btn"

                onClick={logout}

            />

            <SettingsButton

                text="Back to Home"

                icon="🏠"

                className="home-btn"

                onClick={() => navigate("/")}

            />

        </div>

    );

}

export default Settings;