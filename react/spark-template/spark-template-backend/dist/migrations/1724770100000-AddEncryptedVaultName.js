export class AddEncryptedVaultName1724770100000 {
    name = "AddEncryptedVaultName1724770100000";
    async up(queryRunner) {
        await queryRunner.query("ALTER TABLE `vaults` ADD `encrypted_name` text NULL AFTER `salt`");
    }
    async down(queryRunner) {
        await queryRunner.query("ALTER TABLE `vaults` DROP COLUMN `encrypted_name`");
    }
}
//# sourceMappingURL=1724770100000-AddEncryptedVaultName.js.map