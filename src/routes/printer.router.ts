import { Router } from 'express';
import {
  addPrinter,
  deletePrinter,
  getAllPrinters,
  getPrinterById,
  getPrinterWithHistoryById,
  installSupply,
  updatePrinter
} from '../controllers/printer.controller';

const printerRouter = Router();

printerRouter
  .get('/printers', getAllPrinters)
  .get('/printers/:id', getPrinterById)
  .get('/printers/:id/history', getPrinterWithHistoryById)
  .post('/printers', addPrinter)
  .post('/printers/:printerId/supply/:supplyId', installSupply)
  .put('/printers/:id', updatePrinter)
  .delete('/printers/:id', deletePrinter);

export default printerRouter;