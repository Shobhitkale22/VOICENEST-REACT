const DATABASE_NAME = "VoiceNestDB";

const DATABASE_VERSION = 1;

const STORE_NAME = "recordings";

export function openDatabase() {

    return new Promise((resolve, reject) => {

        const request = indexedDB.open(

            DATABASE_NAME,

            DATABASE_VERSION

        );

        request.onupgradeneeded = function (event) {

            const db = event.target.result;

            if (!db.objectStoreNames.contains(STORE_NAME)) {

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
export async function saveRecording(recording) {

    const db = await openDatabase();

    return new Promise((resolve, reject) => {

        const transaction = db.transaction(

            STORE_NAME,

            "readwrite"

        );

        const store = transaction.objectStore(STORE_NAME);

        const request = store.put(recording);

        request.onsuccess = function () {

            resolve();

        };

        request.onerror = function () {

            reject(request.error);

        };

    });

}

export async function getAllRecordings() {

    const db = await openDatabase();

    return new Promise((resolve, reject) => {

        const transaction = db.transaction(

            STORE_NAME,

            "readonly"

        );

        const store = transaction.objectStore(STORE_NAME);

        const request = store.getAll();

        request.onsuccess = function () {

            resolve(request.result);

        };

        request.onerror = function () {

            reject(request.error);

        };

    });

}

export async function getRecordingById(id) {

    const db = await openDatabase();

    return new Promise((resolve, reject) => {

        const transaction = db.transaction(

            STORE_NAME,

            "readonly"

        );

        const store = transaction.objectStore(STORE_NAME);

        const request = store.get(id);

        request.onsuccess = function () {

            resolve(request.result);

        };

        request.onerror = function () {

            reject(request.error);

        };

    });

}