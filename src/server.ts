import app from './app';
import { config } from './config/config';
import { AppDataSource } from './utils/db'

AppDataSource.initialize().then(res => console.log('Database connected.'))
app.listen(config.appPort ?? 3001, () => console.log('app listening on port 3001'))