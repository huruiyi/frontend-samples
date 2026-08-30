import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm"

import { Vault } from "./Vault.js"

@Entity({ name: "notes" })
@Index("idx_notes_vault_updated", ["vaultId", "updatedAt"])
export class Note {
  @PrimaryColumn({ type: "char", length: 36 })
  id!: string

  @Column({ name: "vault_id", type: "char", length: 36 })
  vaultId!: string

  @Column({ type: "longtext" })
  ciphertext!: string

  @Column({ type: "varchar", length: 64 })
  iv!: string

  @Column({ name: "encryption_version", type: "tinyint", unsigned: true, default: 1 })
  encryptionVersion!: number

  @CreateDateColumn({ name: "created_at", type: "datetime", precision: 3 })
  createdAt!: Date

  @UpdateDateColumn({ name: "updated_at", type: "datetime", precision: 3 })
  updatedAt!: Date

  @ManyToOne(() => Vault, (vault) => vault.notes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "vault_id" })
  vault!: Vault
}
