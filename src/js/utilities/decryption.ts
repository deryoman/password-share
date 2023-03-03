import {EncryptionData} from "../types/encryptionData";
import {base64ToArrayBuffer} from "./buffer"

const importKey = async (rawKey: string): Promise<CryptoKey> => {
    return await crypto.subtle.importKey(
        'raw',
        base64ToArrayBuffer(rawKey),
        'AES-CBC',
        true,
        ['decrypt']
    )
}

export const decrypt = async ({ key, iv, cipherText }: EncryptionData): Promise<string> => {
    const dec = new TextDecoder()
    const importedKey = await importKey(key)

    const plaintext = await crypto.subtle.decrypt({
        name: 'AES-CBC',
        iv: base64ToArrayBuffer(iv),
    }, importedKey, base64ToArrayBuffer(cipherText))

    return dec.decode(plaintext)
}