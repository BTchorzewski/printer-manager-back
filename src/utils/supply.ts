import { ListSupplies, PrinterModel, SupplyAvailability } from '../../types/index'
import { SupplyEntity } from "../entities/supply.entity";
import { StoreEntity } from "../entities/store.entity";

export const isAccurateModel = (model: string): boolean => {
  const models = Object.values(PrinterModel) as string[];
  return models.includes(model);
}

export const listSuppliesForPrinter = async (model: PrinterModel): Promise<ListSupplies[]> => {
  return SupplyEntity.find({
    where: {
      model,
    },
    select: {
      id: true,
      name: true,
    },
    order: {
      code: 'ASC',
    }
  })
}


export const checkSupplyAvailability = async (listOfSupplies: ListSupplies[]): Promise<SupplyAvailability[]> => {
  return Promise.all(listOfSupplies.map(async (supply) => {
    const total = await StoreEntity.countBy({
      supply: {
        id: supply.id,
      },
    })
    const totalAvailable = await StoreEntity.countBy({
      supply: {
        id: supply.id,
      },
      isAvailable: true,
    })

    return {
      id: supply.id,
      name: supply.name,
      total,
      totalAvailable,
    }
  }));
}