const {subtle} = globalThis.crypto
import {EncryptionData} from "../types/encryptionData";
import {arrayBufferToBase64} from "./buffer"

const generateAesKey = async (length = 256): Promise<CryptoKey> => {
    return await subtle.generateKey({
        name: 'AES-CBC',
        length,
    }, true, ['encrypt', 'decrypt'])
}

export const encrypt = async (plainText: string): Promise<EncryptionData> => {
    const ec = new TextEncoder()
    const key = await generateAesKey()
    const exportedKey = await crypto.subtle.exportKey('raw', key)
    const iv = crypto.getRandomValues(new Uint8Array(16))

    const ciphertext = await crypto.subtle.encrypt({
        name: 'AES-CBC',
        iv,
    }, key, ec.encode(plainText))

    return {
        key: arrayBufferToBase64(exportedKey),
        iv: arrayBufferToBase64(iv),
        cipherText: arrayBufferToBase64(ciphertext)
    }
}