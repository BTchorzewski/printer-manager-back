import { DataSource } from 'typeorm';
import { config } from '../config/config';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  synchronize: true,
  logging: false,
  entities: ['build/src/entities/*.entity.js'],
  migrations: ['build/src/migrations/*{.ts,.js}'],
  subscribers: [],
  // @ts-ignore
  cli: {
    migrationsDir: 'build/src/migrations'
  },
});
