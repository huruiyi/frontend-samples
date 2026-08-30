import type { MigrationInterface, QueryRunner } from "typeorm"

export class AddEncryptedVaultName1724770100000 implements MigrationInterface {
  name = "AddEncryptedVaultName1724770100000"

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE `vaults` ADD `encrypted_name` text NULL AFTER `salt`")
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE `vaults` DROP COLUMN `encrypted_name`")
  }
}
