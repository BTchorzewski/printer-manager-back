import cors from 'cors';
import express, {json} from 'express';
import {config} from './config/config';
import {errorHandler} from './utils/error-handler';
import printerRouter from './routes/printer.router';
import supplyRouter from './routes/supply.router';
import storeRouter from './routes/store.router';
import reportRouter from './routes/reportRouter';

const app = express();

// parsing json.
app.use(json())

// cors
app.use(cors({
  origin: config.corsOrigin ?? '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  preflightContinue: false,
}))

app.use('/api', printerRouter);
app.use('/api', supplyRouter);
app.use('/api', storeRouter);
app.use('/api', reportRouter);
app.use(errorHandler)

export default app;