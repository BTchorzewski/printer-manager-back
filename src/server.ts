import app from './app';
import { config } from './config/config';
import { AppDataSource } from './utils/data-source'


// @ts-ignore
AppDataSource.initialize().then(res => console.log('Database connected.')).catch(e => console.log('uspik', e))
app.listen(config.appPort ?? 3001, () => console.log('app listening on port 3001'))