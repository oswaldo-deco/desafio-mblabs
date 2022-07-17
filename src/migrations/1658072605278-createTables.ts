import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1658072605278 implements MigrationInterface {
    name = 'createTables1658072605278'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "partner" ("id" uuid NOT NULL, "name" character varying(120) NOT NULL, "description" character varying(300) NOT NULL, "logo" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_8f34ff11ddd5459eacbfacd48ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL, "email" character varying(100) NOT NULL, "name" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_admin" boolean NOT NULL DEFAULT false, "authorized_email" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_ticket" ("id" uuid NOT NULL, "bought_at" TIMESTAMP NOT NULL DEFAULT now(), "price_paid" integer NOT NULL, "userId" uuid, "ticketId" uuid, CONSTRAINT "PK_a9ba1b25310d631c1fcd0f8a71c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ticket" ("id" uuid NOT NULL, "price" integer NOT NULL, "type" character varying NOT NULL, "observations" character varying, "eventId" uuid, CONSTRAINT "PK_d9a0835407701eb86f874474b7c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event" ("id" uuid NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "localization" character varying NOT NULL, "adress" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event_partners_partner" ("eventId" uuid NOT NULL, "partnerId" uuid NOT NULL, CONSTRAINT "PK_de9ac21f09324d5149ba0d1c428" PRIMARY KEY ("eventId", "partnerId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9953ee9b8ab8b88269384b5f7f" ON "event_partners_partner" ("eventId") `);
        await queryRunner.query(`CREATE INDEX "IDX_643c7e92660b7e499b57e01a9a" ON "event_partners_partner" ("partnerId") `);
        await queryRunner.query(`ALTER TABLE "user_ticket" ADD CONSTRAINT "FK_af5341f8c0b28582d959ef5dd19" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_ticket" ADD CONSTRAINT "FK_fa298f42e916dffbd57dd496721" FOREIGN KEY ("ticketId") REFERENCES "ticket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_cb22a51617991265571be41b74f" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event_partners_partner" ADD CONSTRAINT "FK_9953ee9b8ab8b88269384b5f7f6" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "event_partners_partner" ADD CONSTRAINT "FK_643c7e92660b7e499b57e01a9ac" FOREIGN KEY ("partnerId") REFERENCES "partner"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event_partners_partner" DROP CONSTRAINT "FK_643c7e92660b7e499b57e01a9ac"`);
        await queryRunner.query(`ALTER TABLE "event_partners_partner" DROP CONSTRAINT "FK_9953ee9b8ab8b88269384b5f7f6"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_cb22a51617991265571be41b74f"`);
        await queryRunner.query(`ALTER TABLE "user_ticket" DROP CONSTRAINT "FK_fa298f42e916dffbd57dd496721"`);
        await queryRunner.query(`ALTER TABLE "user_ticket" DROP CONSTRAINT "FK_af5341f8c0b28582d959ef5dd19"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_643c7e92660b7e499b57e01a9a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9953ee9b8ab8b88269384b5f7f"`);
        await queryRunner.query(`DROP TABLE "event_partners_partner"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TABLE "ticket"`);
        await queryRunner.query(`DROP TABLE "user_ticket"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "partner"`);
    }

}
