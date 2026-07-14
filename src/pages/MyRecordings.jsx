import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../components/common/PageHeader";
import SearchBar from "../components/common/SearchBar";
import EmptyState from "../components/common/EmptyState";
import Button from "../components/common/Button";
import RecordingCard from "../components/recording/RecordingCard";

function MyRecordings() {

    const navigate = useNavigate();

    const [recordings, setRecordings] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {

        const savedRecordings =
            JSON.parse(localStorage.getItem("recordings")) || [];

        setRecordings(savedRecordings);

    }, []);

    function deleteRecording(id) {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this recording?"
        );

        if (!confirmDelete) {

            return;

        }

        const updatedRecordings = recordings.filter(

            (recording) => recording.id !== id

        );

        setRecordings(updatedRecordings);

        localStorage.setItem(

            "recordings",

            JSON.stringify(updatedRecordings)

        );

    }

    const filteredRecordings = recordings.filter((recording) =>

        recording.title
            .toLowerCase()
            .includes(search.toLowerCase())

    );

    return (

        <div className="page-container">

            <PageHeader

                title="📂 My Recordings"

                subtitle="Manage all your saved recordings"

            />

            <SearchBar

                value={search}

                onChange={(event) =>

                    setSearch(event.target.value)

                }

                placeholder="🔍 Search recordings..."

            />

            {

                filteredRecordings.length === 0 ?

                    (

                        <EmptyState

                            message="No recordings found."

                        />

                    )

                    :

                    (

                        filteredRecordings.map((recording) => (

                            <RecordingCard

                                key={recording.id}

                                id={recording.id}

                                title={recording.title}

                                duration={recording.duration}

                                createdAt={recording.createdAt}

                                onDelete={deleteRecording}

                            />

                        ))

                    )

            }

            <div className="new-recording-button">

                <Button

                    text="➕ New Recording"

                    onClick={() => navigate("/recording")}

                />

            </div>

        </div>

    );

}

export default MyRecordings;