import {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import PageHeader
    from "../components/common/PageHeader";

import EmptyState
    from "../components/common/EmptyState";

import Button
    from "../components/common/Button";

import {
    getSharedRecordings
} from "../services/shareService";


function SharedWithMe() {

    const navigate =
        useNavigate();


    const [shared, setShared] =
        useState([]);


    useEffect(() => {

        loadShared();

    }, []);


    async function loadShared() {

        try {

            const user =
                JSON.parse(

                    localStorage.getItem(
                        "user"
                    )

                );


            if (!user) {

                return;

            }


            const data =
                await getSharedRecordings(
                    user.email
                );


            setShared(data);

        }

        catch (error) {

            console.error(
                "Shared Recordings Error:",
                error
            );

        }

    }


    return (

        <div className="page-container">

            <PageHeader

                title="🤝 Shared With Me"

                subtitle={
                    "Recordings shared by other VoiceNest users"
                }

            />


            {

                shared.length === 0

                ?

                (

                    <EmptyState

                        message={
                            "No shared recordings."
                        }

                    />

                )

                :

                shared.map(
                    (item) => (

                        <div

                            key={
                                item.id
                            }

                            className="card"

                        >

                            <h3>

                                Shared Recording

                            </h3>


                            <p>

                                Shared By User ID:{" "}

                                {
                                    item.ownerId
                                }

                            </p>


                            <p>

                                Shared At:{" "}

                                {
                                    item.sharedAt
                                }

                            </p>


                            <Button

                                text="▶ Open Recording"

                                onClick={() =>

                                    navigate(

                                        `/cloud-details/${item.cloudRecordingId}`

                                    )

                                }

                            />

                        </div>

                    )
                )

            }

        </div>

    );

}


export default SharedWithMe;