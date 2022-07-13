import { DataSource } from 'typeorm';
import { config } from '../config/config';
import { PrinterEntity } from '../entities/printer.entity';
import { SupplyEntity } from '../entities/supply.entity';
import { StoreEntity } from '../entities/store.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  synchronize: true,
  logging: false,
  entities: [PrinterEntity, SupplyEntity, StoreEntity],
  migrations: ['build/src/migrations/*{.ts,.js}'],
  subscribers: [],
  // @ts-ignore
  cli: {
    migrationsDir: 'build/src/migrations'
  },
});
