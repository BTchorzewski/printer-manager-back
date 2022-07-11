import {NextFunction, Request, Response} from 'express';
import {PrinterEntity} from '../entities/printer.entity';
import {StatsRespond} from '../../types/raport';

export const getNumberOfPrinters = async (req: Request, res: Response, next: NextFunction) => {
  const total = await PrinterEntity.count();
  res.json({
    msg: 'Succeed',
    data: total,
  } as StatsRespond)
};

export const getSupplyDemands = async (req: Request, res: Response, next: NextFunction) => {
  res.json({
    msg: 'getSupplyDemands report.',
    data: 0,
  } as StatsRespond);
};
