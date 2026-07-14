import Logo from "./Logo";

function PageHeader({ title, subtitle }) {

    return (

        <div className="page-header">

            <Logo />

            <h2>{title}</h2>

            {subtitle && (

                <p>{subtitle}</p>

            )}

        </div>

    );

}

export default PageHeader;