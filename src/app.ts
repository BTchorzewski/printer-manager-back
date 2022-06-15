import cors from 'cors';
import express, { json } from 'express';
import { config } from '../config/config';
import { errorHandler } from './utils/error-handler';

const app = express();

// parsing json.
app.use(json())

// cors
app.use(cors({
  origin: config.corsOrigin ?? 'http://localhost:3001/'
}))

app.use(errorHandler)
export default app;