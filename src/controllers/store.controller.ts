import { NextFunction, Request, Response } from 'express';
import { AddItemToStoreParam, StoreIdParam, StoreRespond } from '../../types/store';
import { StoreEntity } from '../entities/store.entity';
import { SupplyEntity } from '../entities/supply.entity';
import { ValidationError } from '../utils/error-handler';

export const getItemsFromStore = async (req: Request, res: Response, next: NextFunction) => {
};

export const getItemById = async (req: Request, res: Response, next: NextFunction) => {
  const { storeId } = req.params as unknown as StoreIdParam;
  console.log(storeId);
  try {
    const fetchStoreItem = await StoreEntity.findOne({
      where: { id: storeId },
      relations: {
        supply: true,
      },
    })

    if (fetchStoreItem === null) return next(new ValidationError('the item can not be found in the database.'))

    res.json({
      msg: 'Succeed',
      data: [{
        id: fetchStoreItem.id,
        name: fetchStoreItem.supply.name,
        model: fetchStoreItem.supply.model,
        storedAt: fetchStoreItem.storedAt,
        installedAt: fetchStoreItem.installedAt,
        isAvailable: fetchStoreItem.isAvailable,
      }]
    } as StoreRespond)
  } catch (e) {
    next(e);
  }
};

export const addItemToStore = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { supplyId } = req.params as unknown as AddItemToStoreParam;
    const newItemToStore = new StoreEntity();
    const supply = await SupplyEntity.findOneByOrFail({ id: supplyId })
    newItemToStore.supply = supply;
    await newItemToStore.save();
    await supply.save();
    res.json({ newItemToStore, supply })
  } catch (e) {
    next(e);
  }
};

export const updateItemInStore = async (req: Request, res: Response, next: NextFunction) => {

};

export const deleteItemFromStore = async (req: Request, res: Response, next: NextFunction) => {
  const { storeId } = req.params as unknown as StoreIdParam;
  try {
    const fetchedStoreItem = await StoreEntity.findOneBy({ id: storeId });
    if (fetchedStoreItem === null) return next((new ValidationError('the item can not be found in the store.')));
    if (fetchedStoreItem.installedAt !== null) return next((new ValidationError('An Installed supply can not be deleted.')));
    await fetchedStoreItem.remove()
    res.json({ msg: `item has been deleted.` })
  } catch (e) {
    console.log(e);
    next(e);
  }
};
