function FeatureButton({

    text,

    icon,

    onClick

}){

    return(

        <button

            className="feature-btn"

            onClick={onClick}

        >

            {icon}

            {" "}

            {text}

        </button>

    );

}

export default FeatureButton;