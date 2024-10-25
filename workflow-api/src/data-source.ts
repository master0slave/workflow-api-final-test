import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Users } from 'src/users/entities/users.entity';
import { Items } from 'src/items/entities/items.entity';

const isProduction = process.env.NODE_ENV === 'production';

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as 'postgres' | 'mysql',  // Cast to the correct type
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Users, Items],
  migrations: [isProduction ? 'dist/migrations/*.js' : 'src/migrations/*.ts'],
  synchronize: false, // Make sure to control schema with migrations
});