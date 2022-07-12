import {Router} from 'express';
import {
  addSupply,
  deleteSupply,
  getAllSupplies,
  getAvailableSupplies,
  getSuppliesByModel,
  getSupplyById,
  updateSupply
} from '../controllers/supply.controller';

const supplyRouter = Router();

supplyRouter
  .get('/supplies', getAllSupplies)
  .get('/supplies/:id', getSupplyById)
  .get('/supplies/available/:model', getAvailableSupplies)
  .get('/supplies/model/:model', getSuppliesByModel)
  .post('/supplies', addSupply)
  .put('/supplies/:id', updateSupply)
  .delete('/supplies/:id', deleteSupply);

export default supplyRouter;