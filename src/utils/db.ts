import {DataSource} from "typeorm"
import {config} from '../config/config';

export const AppDataSource = new DataSource({
  type: "mysql",
  host: config.db.host,
  port: 3306,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
})