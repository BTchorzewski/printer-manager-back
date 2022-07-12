import { MigrationInterface, QueryRunner } from "typeorm";

export class newenti1656334587448 implements MigrationInterface {
    name = 'newenti1656334587448'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`store_entity\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`store_entity\` DROP COLUMN \`model\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`store_entity\` ADD \`model\` enum ('Xerox AltaLink C8035', 'Xerox VersaLink C605', 'Xerox VersaLink C400') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`store_entity\` ADD \`name\` varchar(20) NOT NULL`);
    }

}
