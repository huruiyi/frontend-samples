var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Note } from "./Note.js";
let Vault = class Vault {
    id;
    salt;
    encryptedName;
    keyCheck;
    wrappedAccessToken;
    accessTokenHash;
    createdAt;
    updatedAt;
    notes;
};
__decorate([
    PrimaryColumn({ type: "char", length: 36 }),
    __metadata("design:type", String)
], Vault.prototype, "id", void 0);
__decorate([
    Column({ type: "varchar", length: 128 }),
    __metadata("design:type", String)
], Vault.prototype, "salt", void 0);
__decorate([
    Column({ name: "encrypted_name", type: "text", nullable: true }),
    __metadata("design:type", Object)
], Vault.prototype, "encryptedName", void 0);
__decorate([
    Column({ name: "key_check", type: "text" }),
    __metadata("design:type", String)
], Vault.prototype, "keyCheck", void 0);
__decorate([
    Column({ name: "wrapped_access_token", type: "text" }),
    __metadata("design:type", String)
], Vault.prototype, "wrappedAccessToken", void 0);
__decorate([
    Column({ name: "access_token_hash", type: "char", length: 64, select: false }),
    __metadata("design:type", String)
], Vault.prototype, "accessTokenHash", void 0);
__decorate([
    CreateDateColumn({ name: "created_at", type: "datetime", precision: 3 }),
    __metadata("design:type", Date)
], Vault.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn({ name: "updated_at", type: "datetime", precision: 3 }),
    __metadata("design:type", Date)
], Vault.prototype, "updatedAt", void 0);
__decorate([
    OneToMany(() => Note, (note) => note.vault),
    __metadata("design:type", Array)
], Vault.prototype, "notes", void 0);
Vault = __decorate([
    Entity({ name: "vaults" })
], Vault);
export { Vault };
//# sourceMappingURL=Vault.js.map