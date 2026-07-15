function Button({

    text,

    onClick,

    type = "button",

    variant = "primary",

    disabled = false

}) {

    return (

        <button

            className={
                variant === "danger"
                    ? "danger-button"
                    : "primary-button"
            }

            onClick={onClick}

            type={type}

            disabled={disabled}

        >

            {text}

        </button>

    );

}

export default Button;