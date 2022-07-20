import { MigrationInterface, QueryRunner } from "typeorm";

export class ticketAmount1658283064609 implements MigrationInterface {
    name = 'ticketAmount1658283064609'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" RENAME COLUMN "amount_left" TO "amount_bought"`);
        await queryRunner.query(`ALTER TABLE "ticket" ALTER COLUMN "amount_bought" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" ALTER COLUMN "amount_bought" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "ticket" RENAME COLUMN "amount_bought" TO "amount_left"`);
    }

}
