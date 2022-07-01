import { Router } from 'express';
import {
  addSupply,
  deleteSupply,
  getAllSupplies,
  getAvailableSupplies,
  getSupplyById,
  updateSupply
} from '../controllers/supply.controller';

const supplyRouter = Router();

supplyRouter
  .get('/supplies', getAllSupplies)
  .get('/supplies/available', getAvailableSupplies)
  .get('/supplies/:id', getSupplyById)
  .post('/supplies', addSupply)
  .put('/supplies/:id', updateSupply)
  .delete('/supplies/:id', deleteSupply);

export default supplyRouter;