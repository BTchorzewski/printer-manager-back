import { PrinterModel } from '../printer';

export interface Supply {
  id: string;
  name: string;
  code: string;
  isAvailable: boolean;
  model: PrinterModel;
  storedAt: Date;
  installedAt: Date;
  printerId?: string;
}
