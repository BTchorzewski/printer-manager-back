import { BasicStoreItem, StoreItem } from '../store';

export type PrinterTest = string;

export enum PrinterModel {
  Xerox_AltaLink_C8035 = 'Xerox AltaLink C8035',
  Xerox_VersaLink_C605 = 'Xerox VersaLink C605',
  Xerox_VersaLink_C400 = 'Xerox VersaLink C400',
  Unspecified = 'Unspecified',
}

export interface Printer {
  id: string;
  name: string;
  ip: string;
  isMultifunctional: boolean;
  installedAt: Date;
  area: string;
  location: string;
  model: PrinterModel;
}


export interface PrinterWithHistory extends Printer {
  supplies: BasicStoreItem[];
}

export type AddPrinterRequest = Omit<Printer, 'id'>

export type PrinterRespond = {
  msg: 'Succeed';
  data: Printer[] | StoreItem[];
} | {
  msg: 'Fails';
  data: null;
}
