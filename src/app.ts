import cors from 'cors';
import express, { json } from 'express';
import { config } from './config/config';
import { errorHandler } from './utils/error-handler';
import printerRouter from './routes/printer.router';
import supplyRouter from './routes/supply.router';

const app = express();

// parsing json.
app.use(json())

// cors
app.use(cors({
  origin: config.corsOrigin ?? 'http://localhost:3001/'
}))

app.use('/api', printerRouter);
app.use('/api', supplyRouter);

app.use(errorHandler)
export default app;