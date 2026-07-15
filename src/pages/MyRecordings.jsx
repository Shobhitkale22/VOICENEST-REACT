import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../components/common/PageHeader";
import SearchBar from "../components/common/SearchBar";
import EmptyState from "../components/common/EmptyState";
import Button from "../components/common/Button";
import RecordingCard from "../components/recording/RecordingCard";

import {

    getAllRecordings,

    deleteRecording as deleteRecordingFromDB

} from "../services/databaseService";

function MyRecordings() {

    const navigate = useNavigate();

    const [recordings, setRecordings] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {

        loadRecordings();

    }, []);

    async function loadRecordings() {

        try {

            const savedRecordings =
                await getAllRecordings();

            setRecordings(savedRecordings);

        }

        catch (error) {

            console.error(error);

        }

    }

    async function deleteRecording(id) {

        const confirmDelete = window.confirm(

            "Are you sure you want to delete this recording?"

        );

        if (!confirmDelete) {

            return;

        }

        try {

            await deleteRecordingFromDB(id);

            loadRecordings();

        }

        catch (error) {

            console.error(error);

        }

    }

    const filteredRecordings = recordings.filter(

        (recording) =>

            (recording.title || "")
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

                                title={

                                    recording.title ||

                                    "Untitled Recording"

                                }

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

                    onClick={() =>

                        navigate("/recording")

                    }

                />

            </div>

        </div>

    );

}

export default MyRecordings;