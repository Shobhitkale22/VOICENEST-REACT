const DATABASE_NAME = "VoiceNestDB";

const DATABASE_VERSION = 1;

const STORE_NAME = "recordings";


// ==========================================
// OPEN DATABASE
// ==========================================

export function openDatabase() {

    return new Promise((resolve, reject) => {

        const request = indexedDB.open(

            DATABASE_NAME,

            DATABASE_VERSION

        );

        request.onupgradeneeded = function (event) {

            const db = event.target.result;

            if (

                !db.objectStoreNames.contains(

                    STORE_NAME

                )

            ) {

                db.createObjectStore(

                    STORE_NAME,

                    {
                        keyPath: "id"
                    }

                );

            }

        };

        request.onsuccess = function () {

            resolve(request.result);

        };

        request.onerror = function () {

            reject(request.error);

        };

    });

}


// ==========================================
// SAVE RECORDING
// ==========================================

export async function saveRecording(recording) {

    if (!recording) {

        throw new Error(

            "Recording data is missing."

        );

    }

    if (

        recording.id === undefined ||

        recording.id === null

    ) {

        throw new Error(

            "Recording ID is missing."

        );

    }

    const db = await openDatabase();

    return new Promise((resolve, reject) => {

        const transaction = db.transaction(

            STORE_NAME,

            "readwrite"

        );

        const store = transaction.objectStore(

            STORE_NAME

        );

        const request = store.put(recording);

        request.onsuccess = function () {

            resolve(recording);

        };

        request.onerror = function () {

            reject(request.error);

        };

    });

}


// ==========================================
// GET ALL RECORDINGS
// ==========================================

export async function getAllRecordings() {

    const db = await openDatabase();

    return new Promise((resolve, reject) => {

        const transaction = db.transaction(

            STORE_NAME,

            "readonly"

        );

        const store = transaction.objectStore(

            STORE_NAME

        );

        const request = store.getAll();

        request.onsuccess = function () {

            resolve(request.result);

        };

        request.onerror = function () {

            reject(request.error);

        };

    });

}


// ==========================================
// GET RECORDING BY ID
// ==========================================

export async function getRecordingById(id) {

    if (

        id === undefined ||

        id === null

    ) {

        throw new Error(

            "Recording ID is required."

        );

    }

    const db = await openDatabase();

    return new Promise((resolve, reject) => {

        const transaction = db.transaction(

            STORE_NAME,

            "readonly"

        );

        const store = transaction.objectStore(

            STORE_NAME

        );

        const request = store.get(

            Number(id)

        );

        request.onsuccess = function () {

            resolve(request.result);

        };

        request.onerror = function () {

            reject(request.error);

        };

    });

}


// ==========================================
// UPDATE RECORDING
// ==========================================

export async function updateRecording(recording) {

    if (!recording) {

        throw new Error(

            "Recording data is missing."

        );

    }

    if (

        recording.id === undefined ||

        recording.id === null

    ) {

        console.error(

            "Invalid recording passed to updateRecording:",

            recording

        );

        throw new Error(

            "Cannot update recording: ID is missing."

        );

    }

    const db = await openDatabase();

    return new Promise((resolve, reject) => {

        const transaction = db.transaction(

            STORE_NAME,

            "readwrite"

        );

        const store = transaction.objectStore(

            STORE_NAME

        );

        const request = store.put(recording);

        request.onsuccess = function () {

            resolve(recording);

        };

        request.onerror = function () {

            reject(request.error);

        };

    });

}


// ==========================================
// DELETE RECORDING
// ==========================================

export async function deleteRecording(id) {

    if (

        id === undefined ||

        id === null

    ) {

        throw new Error(

            "Recording ID is required."

        );

    }

    const db = await openDatabase();

    return new Promise((resolve, reject) => {

        const transaction = db.transaction(

            STORE_NAME,

            "readwrite"

        );

        const store = transaction.objectStore(

            STORE_NAME

        );

        const request = store.delete(

            Number(id)

        );

        request.onsuccess = function () {

            resolve();

        };

        request.onerror = function () {

            reject(request.error);

        };

    });

}