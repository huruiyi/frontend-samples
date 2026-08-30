export type VaultRegistryEntry = { id: string; name: string }

export const VAULT_REGISTRY_STORAGE_KEY = "whisper-notes-vaults"
export const LEGACY_VAULT_ID_STORAGE_KEY = "whisper-notes-vault-id"

const isEntry = (value: unknown): value is VaultRegistryEntry => {
    if (!value || typeof value !== "object") return false
    const entry = value as Partial<VaultRegistryEntry>
    return typeof entry.id === "string" && entry.id.length > 0 && typeof entry.name === "string" && entry.name.length > 0
}

export function parseVaultRegistry(serialized: string | null, legacyVaultId: string | null): VaultRegistryEntry[] {
    let entries: VaultRegistryEntry[] = []
    try {
        const parsed = serialized ? JSON.parse(serialized) as unknown : []
        if (Array.isArray(parsed)) entries = parsed.filter(isEntry)
    } catch {
        entries = []
    }

    if (legacyVaultId && !entries.some((entry) => entry.id === legacyVaultId)) {
        entries.push({ id: legacyVaultId, name: "已有保险库" })
    }
    return entries
}

export function upsertVaultRegistry(entries: VaultRegistryEntry[], entry: VaultRegistryEntry) {
    const normalized = { id: entry.id.trim(), name: entry.name.trim() || "未命名保险库" }
    return [normalized, ...entries.filter((item) => item.id !== normalized.id)].slice(0, 50)
}

export const removeVaultFromRegistry = (entries: VaultRegistryEntry[], vaultId: string) => entries.filter((entry) => entry.id !== vaultId)
