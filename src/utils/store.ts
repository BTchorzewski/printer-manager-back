import {StoreEntity} from "../entities/store.entity";

export const createStoreItems = (numberOfItems: number): StoreEntity[] => {
  let createdItems = [];
  for (let i = 0; i < numberOfItems; i++) {
    createdItems.push(new StoreEntity())
  }
  return createdItems;
}