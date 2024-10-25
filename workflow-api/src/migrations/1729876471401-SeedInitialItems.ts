import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedInitialItems1729876471401 implements MigrationInterface {
    name = 'SeedInitialItems1729876471401'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO items (title, amount, quantity, status) VALUES
            ('Item 1', 100, 10, 'PENDING'),
            ('Item 2', 200, 5, 'PENDING'),
            ('Item 3', 300, 8, 'PENDING'),
            ('Item 4', 150, 2, 'REJECTED'),
            ('Item 5', 80, 12, 'APPROVED'),
            ('Item 6', 250, 4, 'PENDING'),
            ('Item 7', 350, 3, 'PENDING'),
            ('Item 8', 500, 6, 'PENDING'),
            ('Item 9', 220, 9, 'PENDING'),
            ('Item 10', 180, 7, 'PENDING');
          `);          
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM items WHERE title LIKE 'Item %'`);
    }

}
