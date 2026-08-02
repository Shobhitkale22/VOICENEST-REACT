export async function generateAESKey() {

    return await window.crypto.subtle.generateKey(

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

export async function encryptBlob(blob, key) {

    const buffer = await blob.arrayBuffer();

    const iv = crypto.getRandomValues(
        new Uint8Array(12)
    );

    const encryptedBuffer =
        await crypto.subtle.encrypt(

            {
                name: "AES-GCM",
                iv
            },

            key,

            buffer

        );

    return {

        encryptedBlob: new Blob(
            [encryptedBuffer],
            {
                type: "application/octet-stream"
            }
        ),

        iv

    };

}

export async function decryptBlob(
    encryptedBlob,
    key,
    iv
) {

    const encryptedBuffer =
        await encryptedBlob.arrayBuffer();

    const decryptedBuffer =
        await crypto.subtle.decrypt(

            {
                name: "AES-GCM",
                iv
            },

            key,

            encryptedBuffer

        );

    return new Blob(

        [decryptedBuffer],

        {
            type: "audio/webm"
        }

    );

}