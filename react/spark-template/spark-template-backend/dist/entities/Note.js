var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Vault } from "./Vault.js";
let Note = class Note {
    id;
    vaultId;
    ciphertext;
    iv;
    encryptionVersion;
    createdAt;
    updatedAt;
    vault;
};
__decorate([
    PrimaryColumn({ type: "char", length: 36 }),
    __metadata("design:type", String)
], Note.prototype, "id", void 0);
__decorate([
    Column({ name: "vault_id", type: "char", length: 36 }),
    __metadata("design:type", String)
], Note.prototype, "vaultId", void 0);
__decorate([
    Column({ type: "longtext" }),
    __metadata("design:type", String)
], Note.prototype, "ciphertext", void 0);
__decorate([
    Column({ type: "varchar", length: 64 }),
    __metadata("design:type", String)
], Note.prototype, "iv", void 0);
__decorate([
    Column({ name: "encryption_version", type: "tinyint", unsigned: true, default: 1 }),
    __metadata("design:type", Number)
], Note.prototype, "encryptionVersion", void 0);
__decorate([
    CreateDateColumn({ name: "created_at", type: "datetime", precision: 3 }),
    __metadata("design:type", Date)
], Note.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn({ name: "updated_at", type: "datetime", precision: 3 }),
    __metadata("design:type", Date)
], Note.prototype, "updatedAt", void 0);
__decorate([
    ManyToOne(() => Vault, (vault) => vault.notes, { onDelete: "CASCADE" }),
    JoinColumn({ name: "vault_id" }),
    __metadata("design:type", Vault)
], Note.prototype, "vault", void 0);
Note = __decorate([
    Entity({ name: "notes" }),
    Index("idx_notes_vault_updated", ["vaultId", "updatedAt"])
], Note);
export { Note };
//# sourceMappingURL=Note.js.map