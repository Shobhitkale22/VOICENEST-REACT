function SearchBar({

    value,

    onChange,

    placeholder

}) {

    return (

        <div className="search-wrapper">

            <input

                className="search-bar"

                type="text"

                value={value}

                onChange={onChange}

                placeholder={placeholder}

            />

        </div>

    );

}

export default SearchBar;