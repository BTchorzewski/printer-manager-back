import { MigrationInterface, QueryRunner } from "typeorm";

export class newenti1656335314054 implements MigrationInterface {
    name = 'newenti1656335314054'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`supply_entity\` DROP COLUMN \`installedAt\``);
        await queryRunner.query(`ALTER TABLE \`supply_entity\` DROP COLUMN \`isAvailable\``);
        await queryRunner.query(`ALTER TABLE \`supply_entity\` DROP COLUMN \`storedAt\``);
        await queryRunner.query(`ALTER TABLE \`store_entity\` ADD \`isAvailable\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`store_entity\` ADD \`installedAt\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`store_entity\` ADD \`storedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`store_entity\` DROP COLUMN \`storedAt\``);
        await queryRunner.query(`ALTER TABLE \`store_entity\` DROP COLUMN \`installedAt\``);
        await queryRunner.query(`ALTER TABLE \`store_entity\` DROP COLUMN \`isAvailable\``);
        await queryRunner.query(`ALTER TABLE \`supply_entity\` ADD \`storedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`supply_entity\` ADD \`isAvailable\` tinyint NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`supply_entity\` ADD \`installedAt\` datetime NOT NULL`);
    }

}
