import app from './app';
import { config } from '../config/config';

app.listen(config.appPort ?? 3001, () => console.log('app listening on port 3001'))