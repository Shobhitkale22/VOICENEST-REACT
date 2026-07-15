import Logo from "./Logo";

function PageHeader({

    title,

    subtitle

}) {

    return (

        <div className="page-header">

            <Logo />

            <div className="page-header-content">

                <h2>

                    {title}

                </h2>

                {

                    subtitle &&

                    <p>

                        {subtitle}

                    </p>

                }

            </div>

        </div>

    );

}

export default PageHeader;