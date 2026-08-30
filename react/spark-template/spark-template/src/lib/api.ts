import type { EncryptedBlob } from "./crypto"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api/v1"

export type VaultBootstrap = { id: string; salt: string; keyCheck: EncryptedBlob; wrappedAccessToken: EncryptedBlob; encryptedName?: EncryptedBlob | null }
export type VaultSummary = { id: string; createdAt: string }
export type EncryptedNoteRecord = EncryptedBlob & { id: string; vaultId: string; encryptionVersion: 1; createdAt: string; updatedAt: string }

const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${path}`, { ...init, headers: { "Content-Type": "application/json", ...init?.headers } })
    if (!response.ok) {
        const body = await response.json().catch(() => null) as { message?: string } | null
        throw new Error(body?.message ?? `请求失败 (${response.status})`)
    }
    if (response.status === 204) return undefined as T
    return response.json() as Promise<T>
}

const authorized = (accessToken: string, init?: RequestInit): RequestInit => ({ ...init, headers: { ...init?.headers, Authorization: `Bearer ${accessToken}` } })

export const vaultApi = {
    list: () => request<VaultSummary[]>("/vaults"),
    create: (payload: VaultBootstrap & { accessToken: string }) => request<{ id: string; createdAt: string }>("/vaults", { method: "POST", body: JSON.stringify(payload) }),
    bootstrap: (vaultId: string) => request<VaultBootstrap>(`/vaults/${vaultId}/bootstrap`),
    listNotes: (vaultId: string, accessToken: string) => request<EncryptedNoteRecord[]>(`/vaults/${vaultId}/notes`, authorized(accessToken)),
    createNote: (vaultId: string, accessToken: string, payload: Pick<EncryptedNoteRecord, "id" | "iv" | "ciphertext" | "encryptionVersion">) => request<EncryptedNoteRecord>(`/vaults/${vaultId}/notes`, authorized(accessToken, { method: "POST", body: JSON.stringify(payload) })),
    updateNote: (vaultId: string, accessToken: string, noteId: string, payload: Pick<EncryptedNoteRecord, "iv" | "ciphertext" | "encryptionVersion">) => request<EncryptedNoteRecord>(`/vaults/${vaultId}/notes/${noteId}`, authorized(accessToken, { method: "PUT", body: JSON.stringify(payload) })),
    deleteNote: (vaultId: string, accessToken: string, noteId: string) => request<void>(`/vaults/${vaultId}/notes/${noteId}`, authorized(accessToken, { method: "DELETE" })),
}
