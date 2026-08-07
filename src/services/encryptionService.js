// ==========================================
// GENERATE AES KEY
// ==========================================

export async function generateAESKey() {

    return await crypto.subtle.generateKey(

        {
            name: "AES-GCM",
            length: 256
        },

        true,

        [
            "encrypt",
            "decrypt"
        ]

    );

}


// ==========================================
// EXPORT AES KEY
// CryptoKey → ArrayBuffer
// ==========================================

export async function exportAESKey(key) {

    // Already exported
    if (key instanceof ArrayBuffer) {

        return key;

    }

    // Uint8Array
    if (key instanceof Uint8Array) {

        return key.buffer;

    }

    // CryptoKey
    if (key instanceof CryptoKey) {

        return await crypto.subtle.exportKey(

            "raw",

            key

        );

    }

    throw new Error(

        "Invalid AES key format."

    );

}


// ==========================================
// IMPORT AES KEY
// ArrayBuffer / Uint8Array → CryptoKey
// ==========================================

export async function importAESKey(rawKey) {

    // If it is already a CryptoKey
    if (rawKey instanceof CryptoKey) {

        return rawKey;

    }

    let keyData = rawKey;

    if (rawKey instanceof Uint8Array) {

        keyData = rawKey.buffer;

    }

    if (!(keyData instanceof ArrayBuffer)) {

        throw new Error(

            "Invalid raw AES key."

        );

    }

    return await crypto.subtle.importKey(

        "raw",

        keyData,

        {
            name: "AES-GCM"
        },

        true,

        [
            "encrypt",
            "decrypt"
        ]

    );

}


// ==========================================
// ENCRYPT BLOB
// ==========================================

export async function encryptBlob(

    blob,

    key

) {

    const buffer = await blob.arrayBuffer();

    const iv = crypto.getRandomValues(

        new Uint8Array(12)

    );

    // Make sure key is CryptoKey
    const cryptoKey = await importAESKey(key);

    const encryptedBuffer =

        await crypto.subtle.encrypt(

            {
                name: "AES-GCM",

                iv: iv

            },

            cryptoKey,

            buffer

        );

    return {

        encryptedBlob: new Blob(

            [
                encryptedBuffer
            ],

            {
                type: "application/octet-stream"
            }

        ),

        iv: iv

    };

}


// ==========================================
// DECRYPT BLOB
// ==========================================

export async function decryptBlob(

    encryptedBlob,

    key,

    iv

) {

    if (!encryptedBlob) {

        throw new Error(

            "Encrypted recording not found."

        );

    }

    if (!key) {

        throw new Error(

            "Encryption key not found."

        );

    }

    if (!iv) {

        throw new Error(

            "Initialization vector not found."

        );

    }

    // Convert key to CryptoKey if necessary
    const cryptoKey = await importAESKey(key);

    const encryptedBuffer =

        await encryptedBlob.arrayBuffer();

    const decryptedBuffer =

        await crypto.subtle.decrypt(

            {
                name: "AES-GCM",

                iv: iv

            },

            cryptoKey,

            encryptedBuffer

        );

    return new Blob(

        [
            decryptedBuffer
        ],

        {
            type: "audio/webm"
        }

    );

}