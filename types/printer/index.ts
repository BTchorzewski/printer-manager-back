import { Supply } from '../supply';

export type PrinterTest = string;

export enum PrinterModel {
  Xerox_AltaLink_C8035 = 'Xerox AltaLink C8035',
  Xerox_VersaLink_C605 = 'Xerox VersaLink C605',
  Xerox_VersaLink_C400 = 'Xerox VersaLink C400',
}

export interface Printer {
  id: string;
  name: string;
  ip: string;
  isMultifunctional: boolean;
  area: string;
  location: string;
  model: PrinterModel;
  supplies: Supply[];
}
