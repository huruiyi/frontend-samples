const encoder = new TextEncoder()
const decoder = new TextDecoder()

export type EncryptedBlob = { iv: string; ciphertext: string }
export type NotePayload = { title: string; content: string }

const toBase64 = (bytes: Uint8Array) => {
    let binary = ""
    for (const byte of bytes) binary += String.fromCharCode(byte)
    return btoa(binary)
}

const fromBase64 = (value: string) => {
    const binary = atob(value)
    return Uint8Array.from(binary, (character) => character.charCodeAt(0))
}

const randomBytes = (length: number) => crypto.getRandomValues(new Uint8Array(length))

export const deriveVaultKey = async (password: string, salt: string) => {
    const passwordKey = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveKey"])
    return crypto.subtle.deriveKey(
        { name: "PBKDF2", hash: "SHA-256", salt: fromBase64(salt), iterations: 600_000 },
        passwordKey,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"],
    )
}

export const encryptJson = async <T>(key: CryptoKey, value: T, additionalData: string): Promise<EncryptedBlob> => {
    const iv = randomBytes(12)
    const ciphertext = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv, additionalData: encoder.encode(additionalData) },
        key,
        encoder.encode(JSON.stringify(value)),
    )
    return { iv: toBase64(iv), ciphertext: toBase64(new Uint8Array(ciphertext)) }
}

export const decryptJson = async <T>(key: CryptoKey, value: EncryptedBlob, additionalData: string): Promise<T> => {
    const plaintext = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: fromBase64(value.iv), additionalData: encoder.encode(additionalData) },
        key,
        fromBase64(value.ciphertext),
    )
    return JSON.parse(decoder.decode(plaintext)) as T
}

export const createVaultMaterial = async (password: string, vaultName = "未命名保险库") => {
    const id = crypto.randomUUID()
    const salt = toBase64(randomBytes(16))
    const accessToken = toBase64(randomBytes(32))
    const key = await deriveVaultKey(password, salt)
    const keyCheck = await encryptJson(key, { marker: "whisper-notes-v1" }, `vault:${id}:check`)
    const wrappedAccessToken = await encryptJson(key, { accessToken }, `vault:${id}:token`)
    const encryptedName = await encryptJson(key, { name: vaultName.trim() || "未命名保险库" }, `vault:${id}:metadata`)
    return { id, salt, accessToken, key, keyCheck, wrappedAccessToken, encryptedName }
}

export const unlockVaultMaterial = async (
    password: string,
    vault: { id: string; salt: string; keyCheck: EncryptedBlob; wrappedAccessToken: EncryptedBlob; encryptedName?: EncryptedBlob | null },
) => {
    const key = await deriveVaultKey(password, vault.salt)
    const check = await decryptJson<{ marker: string }>(key, vault.keyCheck, `vault:${vault.id}:check`)
    if (check.marker !== "whisper-notes-v1") throw new Error("加密密码不正确")
    const { accessToken } = await decryptJson<{ accessToken: string }>(key, vault.wrappedAccessToken, `vault:${vault.id}:token`)
    const name = vault.encryptedName
        ? (await decryptJson<{ name: string }>(key, vault.encryptedName, `vault:${vault.id}:metadata`)).name
        : "未命名保险库"
    return { key, accessToken, name }
}

export const encryptNote = (key: CryptoKey, vaultId: string, noteId: string, payload: NotePayload) =>
    encryptJson(key, payload, `note:${vaultId}:${noteId}:v1`)

export const decryptNote = (key: CryptoKey, vaultId: string, noteId: string, payload: EncryptedBlob) =>
    decryptJson<NotePayload>(key, payload, `note:${vaultId}:${noteId}:v1`)
