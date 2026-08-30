import assert from "node:assert/strict"

import { createVaultMaterial, decryptNote, encryptNote, unlockVaultMaterial } from "../../spark-template/src/lib/crypto.ts"

const baseUrl = "http://127.0.0.1:3100/api/v1"
const material = await createVaultMaterial("integration-passphrase-2026", "集成测试保险库")
let vaultCreated = false

const call = (path: string, init?: RequestInit) => fetch(`${baseUrl}${path}`, {
  ...init,
  headers: { "Content-Type": "application/json", ...init?.headers },
})

try {
  let response = await call("/vaults", { method: "POST", body: JSON.stringify(material) })
  assert.equal(response.status, 201)
  vaultCreated = true

  response = await call("/vaults")
  assert.equal(response.status, 200)
  const vaults = await response.json() as Array<{ id: string; createdAt: string }>
  assert.equal(vaults.some((vault) => vault.id === material.id), true)

  response = await call(`/vaults/${material.id}/bootstrap`)
  assert.equal(response.status, 200)
  const bootstrap = await response.json() as Parameters<typeof unlockVaultMaterial>[1]
  assert.equal((await unlockVaultMaterial("integration-passphrase-2026", bootstrap)).name, "集成测试保险库")

  response = await call(`/vaults/${material.id}/notes`, { headers: { Authorization: "Bearer wrong-token-that-is-long-enough" } })
  assert.equal(response.status, 401)

  const noteId = crypto.randomUUID()
  const original = { title: "E2E encrypted title", content: "# Markdown\n\nEncrypted body." }
  const encrypted = await encryptNote(material.key, material.id, noteId, original)
  response = await call(`/vaults/${material.id}/notes`, {
    method: "POST",
    headers: { Authorization: `Bearer ${material.accessToken}` },
    body: JSON.stringify({ id: noteId, ...encrypted, encryptionVersion: 1 }),
  })
  assert.equal(response.status, 201)

  response = await call(`/vaults/${material.id}/notes`, { headers: { Authorization: `Bearer ${material.accessToken}` } })
  assert.equal(response.status, 200)
  const records = await response.json() as Array<{ id: string; iv: string; ciphertext: string }>
  assert.equal(records.length, 1)
  assert.equal(records[0].ciphertext.includes(original.title), false)
  assert.deepEqual(await decryptNote(material.key, material.id, noteId, records[0]), original)

  const changed = { title: "Updated title", content: "## Updated Markdown" }
  const updated = await encryptNote(material.key, material.id, noteId, changed)
  response = await call(`/vaults/${material.id}/notes/${noteId}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${material.accessToken}` },
    body: JSON.stringify({ ...updated, encryptionVersion: 1 }),
  })
  assert.equal(response.status, 200)

  response = await call(`/vaults/${material.id}/notes`, { headers: { Authorization: `Bearer ${material.accessToken}` } })
  const [stored] = await response.json() as Array<{ id: string; iv: string; ciphertext: string }>
  assert.deepEqual(await decryptNote(material.key, material.id, noteId, stored), changed)
  console.log("Encrypted vault CRUD and client-side decryption passed.")
} finally {
  if (vaultCreated) {
    await call(`/vaults/${material.id}`, { method: "DELETE", headers: { Authorization: `Bearer ${material.accessToken}` } })
  }
}
