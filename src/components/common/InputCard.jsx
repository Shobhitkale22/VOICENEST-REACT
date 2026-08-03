function InputCard({

    label,

    type = "text",

    placeholder,

    value,

    onChange,

    icon,

    required = false

}) {

    return (

        <div className="input-card">

            <label className="input-label">

                {icon} {label}

            </label>

            <input

                type={type}

                placeholder={placeholder}

                value={value}

                onChange={onChange}

                required={required}

                className="input-field"

            />

        </div>

    );

}

export default InputCard;