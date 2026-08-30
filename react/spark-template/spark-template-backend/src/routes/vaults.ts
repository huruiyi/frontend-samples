import { Router } from "express"
import { z } from "zod"

import { AppDataSource } from "../database/data-source.js"
import { Vault } from "../entities/Vault.js"
import { hashAccessToken } from "../lib/token.js"
import { requireVaultAccess } from "../middleware/vault-auth.js"

const encryptedBlob = z.object({ iv: z.string().min(8).max(64), ciphertext: z.string().min(16) })
const createVaultSchema = z.object({
  id: z.string().uuid(),
  salt: z.string().min(16).max(128),
  encryptedName: encryptedBlob.optional(),
  keyCheck: encryptedBlob,
  wrappedAccessToken: encryptedBlob,
  accessToken: z.string().min(32).max(256),
})

export const vaultsRouter = Router()

vaultsRouter.get("/", async (_request, response) => {
  const vaults = await AppDataSource.getRepository(Vault).find({
    select: { id: true, createdAt: true },
    order: { createdAt: "DESC" },
  })
  response.json(vaults)
})

vaultsRouter.post("/", async (request, response) => {
  const body = createVaultSchema.parse(request.body)
  const repository = AppDataSource.getRepository(Vault)
  if (await repository.existsBy({ id: body.id })) {
    response.status(409).json({ message: "Vault already exists" })
    return
  }

  const vault = repository.create({
    id: body.id,
    salt: body.salt,
    encryptedName: body.encryptedName ? JSON.stringify(body.encryptedName) : null,
    keyCheck: JSON.stringify(body.keyCheck),
    wrappedAccessToken: JSON.stringify(body.wrappedAccessToken),
    accessTokenHash: hashAccessToken(body.accessToken),
  })
  await repository.save(vault)
  response.status(201).json({ id: vault.id, createdAt: vault.createdAt })
})

vaultsRouter.get("/:vaultId/bootstrap", async (request, response) => {
  const vault = await AppDataSource.getRepository(Vault).findOneBy({ id: request.params.vaultId })
  if (!vault) {
    response.status(404).json({ message: "Vault not found" })
    return
  }
  response.json({
    id: vault.id,
    salt: vault.salt,
    encryptedName: vault.encryptedName ? JSON.parse(vault.encryptedName) : null,
    keyCheck: JSON.parse(vault.keyCheck),
    wrappedAccessToken: JSON.parse(vault.wrappedAccessToken),
  })
})

vaultsRouter.delete("/:vaultId", requireVaultAccess, async (request, response) => {
  const vaultId = request.params.vaultId as string
  await AppDataSource.getRepository(Vault).delete({ id: vaultId })
  response.status(204).send()
})
