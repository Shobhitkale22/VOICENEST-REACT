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