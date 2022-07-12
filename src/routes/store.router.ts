import { Router } from 'express';
import { addItemToStore, deleteItemFromStore, getItemById, getItemsFromStore } from '../controllers/store.controller';

const storeRouter = Router();

storeRouter
  .get('/store', getItemsFromStore)
  .get('/store/:storeId', getItemById)
  .post('/store/:supplyId', addItemToStore)
  .put('/store/:storeId')
  .delete('/store/:storeId', deleteItemFromStore);
export default storeRouter;