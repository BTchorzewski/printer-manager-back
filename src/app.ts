import cors from 'cors';
import express, { json } from 'express';
import { config } from '../config/config';

const app = express();

// parsing json.
app.use(json())

// cors
app.use(cors({
  origin: config.corsOrigin ?? 'http://localhost:3001/'
}))

export default app;