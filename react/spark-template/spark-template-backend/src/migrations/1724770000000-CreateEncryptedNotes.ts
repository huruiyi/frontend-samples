import type { MigrationInterface, QueryRunner } from "typeorm"

export class CreateEncryptedNotes1724770000000 implements MigrationInterface {
  name = "CreateEncryptedNotes1724770000000"

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`vaults\` (\`id\` char(36) NOT NULL, \`salt\` varchar(128) NOT NULL, \`key_check\` text NOT NULL, \`wrapped_access_token\` text NOT NULL, \`access_token_hash\` char(64) NOT NULL, \`created_at\` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3), \`updated_at\` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`)
    await queryRunner.query(`CREATE TABLE \`notes\` (\`id\` char(36) NOT NULL, \`vault_id\` char(36) NOT NULL, \`ciphertext\` longtext NOT NULL, \`iv\` varchar(64) NOT NULL, \`encryption_version\` tinyint UNSIGNED NOT NULL DEFAULT '1', \`created_at\` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3), \`updated_at\` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3), INDEX \`idx_notes_vault_updated\` (\`vault_id\`, \`updated_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`)
    await queryRunner.query(`ALTER TABLE \`notes\` ADD CONSTRAINT \`fk_notes_vault\` FOREIGN KEY (\`vault_id\`) REFERENCES \`vaults\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE `notes` DROP FOREIGN KEY `fk_notes_vault`")
    await queryRunner.query("DROP TABLE `notes`")
    await queryRunner.query("DROP TABLE `vaults`")
  }
}
