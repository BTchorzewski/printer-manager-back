import {Router} from 'express';
import {getNumberOfPrinters, getSupplyDemands} from '../controllers/raport.controller';

const reportRouter = Router();

reportRouter
  .get('/reports/printers-number', getNumberOfPrinters)
  .get('/reports/supply-demands', getSupplyDemands)

export default reportRouter;