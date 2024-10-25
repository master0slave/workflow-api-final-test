import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersAndItemsTables1729876298418 implements MigrationInterface {
    name = 'CreateUsersAndItemsTables1729876298418'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bg_user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."bg_user_role_enum" NOT NULL DEFAULT 'USER', "registered_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_70133044d7ea077e09886033f39" UNIQUE ("username"), CONSTRAINT "PK_5640fbf3f76a3f7dc4548b0189d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "items" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "amount" integer NOT NULL, "quantity" integer NOT NULL, "status" character varying(255) NOT NULL, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "items"`);
        await queryRunner.query(`DROP TABLE "bg_user"`);
    }

}
