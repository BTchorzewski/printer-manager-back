import { Router } from 'express';
import {
  addPrinter,
  deletePrinter,
  getAllPrinters,
  getPrinterById,
  installSupply,
  updatePrinter
} from '../controllers/printer.controller';

const printerRouter = Router();

printerRouter
  .get('/printers', getAllPrinters)
  .get('/printers/:id', getPrinterById)
  .post('/printers', addPrinter)
  .post('/printers/:printerId/supply/:supplyId', installSupply)
  .put('/printers/:id', updatePrinter)
  .delete('/printers/:id', deletePrinter);

export default printerRouter;