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

import RecordingCard
from "../components/recording/RecordingCard";

import {
    getCloudRecordings
} from "../services/cloudService";


function CloudRecordings() {

    const navigate = useNavigate();

    const [recordings, setRecordings] =
        useState([]);


    useEffect(() => {

        loadCloudRecordings();

    }, []);


    async function loadCloudRecordings() {

        try {

            const user =
                JSON.parse(
                    localStorage.getItem("user")
                );


            if (!user) {

                console.error(
                    "User not found."
                );

                return;

            }


            const data =
                await getCloudRecordings(
                    user.id
                );


            console.log(
                "Cloud Recordings:",
                data
            );


            setRecordings(data);

        }

        catch (error) {

            console.error(
                "Cloud Recordings Error:",
                error
            );

        }

    }


    function openCloudDetails(recordingId) {

        console.log(
            "Opening Cloud Recording:",
            recordingId
        );


        navigate(
            `/cloud-details/${recordingId}`
        );

    }


    return (

        <div className="page-container">

            <PageHeader

                title="☁ My Cloud Recordings"

                subtitle={
                    "Encrypted recordings stored in your private cloud"
                }

            />


            {

                recordings.length === 0

                ?

                (

                    <EmptyState

                        message={
                            "No cloud recordings."
                        }

                    />

                )

                :

                (

                    recordings.map(
                        (recording) => (

                            <RecordingCard

                                key={
                                    recording.id
                                }

                                id={
                                    recording.id
                                }

                                title={
                                    recording.title ||
                                    "Untitled Recording"
                                }

                                duration={
                                    recording.duration ||
                                    "00:00"
                                }

                                createdAt={
                                    recording.uploadedAt
                                }


                                onClick={() =>

                                    openCloudDetails(
                                        recording.id
                                    )

                                }


                                onDelete={() => {}}

                            />

                        )
                    )

                )

            }

        </div>

    );

}


export default CloudRecordings;