function SettingsCard({ icon, title, children }) {

    return (

        <div className="settings-card">

            <div className="settings-icon">

                {icon}

            </div>

            <div className="settings-content">

                <h3>{title}</h3>

                {children}

            </div>

        </div>

    );

}

export default SettingsCard;