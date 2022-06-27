import { MigrationInterface, QueryRunner } from "typeorm";

export class newenti1656334479275 implements MigrationInterface {
    name = 'newenti1656334479275'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`supply_entity\` DROP FOREIGN KEY \`FK_0d7b29187d537de6a537b24530e\``);
        await queryRunner.query(`CREATE TABLE \`store_entity\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(20) NOT NULL, \`model\` enum ('Xerox AltaLink C8035', 'Xerox VersaLink C605', 'Xerox VersaLink C400') NOT NULL, \`printerId\` varchar(36) NULL, \`supplyId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`supply_entity\` DROP COLUMN \`printerIdId\``);
        await queryRunner.query(`ALTER TABLE \`store_entity\` ADD CONSTRAINT \`FK_af50a401c6abc20031671c32664\` FOREIGN KEY (\`printerId\`) REFERENCES \`printer_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`store_entity\` ADD CONSTRAINT \`FK_a85b27bfedd46c3769d98a1e66f\` FOREIGN KEY (\`supplyId\`) REFERENCES \`supply_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`store_entity\` DROP FOREIGN KEY \`FK_a85b27bfedd46c3769d98a1e66f\``);
        await queryRunner.query(`ALTER TABLE \`store_entity\` DROP FOREIGN KEY \`FK_af50a401c6abc20031671c32664\``);
        await queryRunner.query(`ALTER TABLE \`supply_entity\` ADD \`printerIdId\` varchar(36) NULL`);
        await queryRunner.query(`DROP TABLE \`store_entity\``);
        await queryRunner.query(`ALTER TABLE \`supply_entity\` ADD CONSTRAINT \`FK_0d7b29187d537de6a537b24530e\` FOREIGN KEY (\`printerIdId\`) REFERENCES \`printer_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
