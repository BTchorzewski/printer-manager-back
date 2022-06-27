import { PrinterModel } from '../printer';

export interface Supply {
  id: string;
  name: string;
  code: string;
  model: PrinterModel;
  printerId?: string;
}

export type AddSupplyRequest = Omit<Supply, 'id'>

export type SupplyParam = {
  id: string;
}

export type SupplyRespond = {
  msg: 'Succeed';
  data: Supply[];
} | {
  msg: 'Fails';
}
