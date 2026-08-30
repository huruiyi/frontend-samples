import "reflect-metadata"
import { DataSource } from "typeorm"

import { config } from "../config.js"
import { Note } from "../entities/Note.js"
import { Vault } from "../entities/Vault.js"
import { CreateEncryptedNotes1724770000000 } from "../migrations/1724770000000-CreateEncryptedNotes.js"
import { AddEncryptedVaultName1724770100000 } from "../migrations/1724770100000-AddEncryptedVaultName.js"

export const AppDataSource = new DataSource({
  type: "mysql",
  ...config.database,
  charset: "utf8mb4",
  timezone: "Z",
  entities: [Vault, Note],
  migrations: [CreateEncryptedNotes1724770000000, AddEncryptedVaultName1724770100000],
  migrationsRun: true,
  synchronize: false,
  logging: false,
})
