import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserReadBookTable1736016384732 implements MigrationInterface {
    name = 'CreateUserReadBookTable1736016384732'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_read_book" ("id" SERIAL NOT NULL, "start_page" integer NOT NULL, "end_page" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer NOT NULL, "book_id" integer NOT NULL, CONSTRAINT "PK_c395b6cdfa878c43bd8f9081364" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_read_book" ADD CONSTRAINT "FK_354c0d177add88bab2e04c04b77" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_read_book" ADD CONSTRAINT "FK_6c88066e74768cb727627845b47" FOREIGN KEY ("book_id") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_read_book" DROP CONSTRAINT "FK_6c88066e74768cb727627845b47"`);
        await queryRunner.query(`ALTER TABLE "user_read_book" DROP CONSTRAINT "FK_354c0d177add88bab2e04c04b77"`);
        await queryRunner.query(`DROP TABLE "user_read_book"`);
    }

}
