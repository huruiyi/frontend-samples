import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm"

import { Note } from "./Note.js"

@Entity({ name: "vaults" })
export class Vault {
  @PrimaryColumn({ type: "char", length: 36 })
  id!: string

  @Column({ type: "varchar", length: 128 })
  salt!: string

  @Column({ name: "encrypted_name", type: "text", nullable: true })
  encryptedName!: string | null

  @Column({ name: "key_check", type: "text" })
  keyCheck!: string

  @Column({ name: "wrapped_access_token", type: "text" })
  wrappedAccessToken!: string

  @Column({ name: "access_token_hash", type: "char", length: 64, select: false })
  accessTokenHash!: string

  @CreateDateColumn({ name: "created_at", type: "datetime", precision: 3 })
  createdAt!: Date

  @UpdateDateColumn({ name: "updated_at", type: "datetime", precision: 3 })
  updatedAt!: Date

  @OneToMany(() => Note, (note) => note.vault)
  notes!: Note[]
}
