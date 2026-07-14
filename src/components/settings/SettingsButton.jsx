function SettingsButton({

    text,

    icon,

    onClick,

    className = ""

}) {

    return (

        <button

            className={`settings-button ${className}`}

            onClick={onClick}

        >

            <span>{icon}</span>

            <span>{text}</span>

        </button>

    );

}

export default SettingsButton;