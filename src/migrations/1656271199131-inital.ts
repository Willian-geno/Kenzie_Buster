import { MigrationInterface, QueryRunner } from "typeorm";

export class inital1656271199131 implements MigrationInterface {
    name = 'inital1656271199131'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stock" ("stockId" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "price" double precision NOT NULL, CONSTRAINT "PK_0004798645c233732d6dfae2cb2" PRIMARY KEY ("stockId"))`);
        await queryRunner.query(`CREATE TABLE "dvd" ("dvdId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "duration" character varying NOT NULL, "stockStockId" uuid, CONSTRAINT "REL_6ba2813b267324791e1cb55ef4" UNIQUE ("stockStockId"), CONSTRAINT "PK_6731d37a00dd70f61e7d6d0aceb" PRIMARY KEY ("dvdId"))`);
        await queryRunner.query(`CREATE TABLE "users" ("userId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isAdm" boolean NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_8bf09ba754322ab9c22a215c919" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "carts" ("carId" uuid NOT NULL DEFAULT uuid_generate_v4(), "paid" boolean NOT NULL, "total" double precision NOT NULL, "userUserId" uuid, "dvdDvdId" uuid, CONSTRAINT "PK_3036b0f39152ee3daa9290a54a4" PRIMARY KEY ("carId"))`);
        await queryRunner.query(`ALTER TABLE "dvd" ADD CONSTRAINT "FK_6ba2813b267324791e1cb55ef40" FOREIGN KEY ("stockStockId") REFERENCES "stock"("stockId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_b50e2403bed7d7f56a098ef7df4" FOREIGN KEY ("userUserId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_ddafc959eefce5a51eb7d2de753" FOREIGN KEY ("dvdDvdId") REFERENCES "dvd"("dvdId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_ddafc959eefce5a51eb7d2de753"`);
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_b50e2403bed7d7f56a098ef7df4"`);
        await queryRunner.query(`ALTER TABLE "dvd" DROP CONSTRAINT "FK_6ba2813b267324791e1cb55ef40"`);
        await queryRunner.query(`DROP TABLE "carts"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "dvd"`);
        await queryRunner.query(`DROP TABLE "stock"`);
    }

}
