import { NextFunction, Request, Response } from 'express';
import { AddPrinterRequest, InstallSupplyRequest, PrinterRespond, PrinterWithHistory } from '../../types';
import { PrinterEntity } from '../entities/printer.entity';
import { StoreEntity } from '../entities/store.entity';
import { ValidationError } from '../utils/error-handler';
import { AppDataSource } from '../utils/data-source';

export const getAllPrinters = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fetchedPrinters = await AppDataSource
      .createQueryBuilder()
      .where('printer.id IS NOT NULL')
      .select('printer')
      .from(PrinterEntity, 'printer')
      .orderBy('printer.installedAt', 'DESC')
      .leftJoinAndSelect('printer.supplies', 'stores')
      .leftJoinAndSelect('stores.supply', 'supply')
      .getMany();

    const printers = fetchedPrinters.map(printer => {
      return {
        ...printer,
        supplies: printer.supplies.map(storeItem => {
          const { supply } = storeItem;
          return {
            name: supply.name,
            installedAt: storeItem.installedAt,
          }
        })
      } as PrinterWithHistory;
    })

    res.json({
      msg: 'Succeed',
      data: [...printers],
    } as unknown as PrinterRespond);
  }
    // @ts-ignore
  catch (e: Error) {
    const er = new ValidationError(e.message)
    next(er);
  }

};

export const getPrinterById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const fetchedPrinter = await PrinterEntity.findOneBy({ id })
    if (fetchedPrinter === null) return next(new ValidationError('the printer was not found.'));

    res.json({
      msg: 'Succeed',
      data: [fetchedPrinter]
    } as PrinterRespond);

  } catch (e) {
    const er = new ValidationError(e.message)
    next(er);
  }


};
export const getPrinterWithHistoryById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {

    const fetchedPrinter = await AppDataSource
      .createQueryBuilder()
      .where('printer.id = :id', { id })
      .select('printer')
      .from(PrinterEntity, 'printer')
      .leftJoinAndSelect('printer.supplies', 'stores')
      .leftJoinAndSelect('stores.supply', 'supply')
      .getOne();

    //check if a printer exists.
    if (fetchedPrinter === null) return next(new ValidationError('the printer was not found.'));
    const printer = {
      ...fetchedPrinter,
      supplies: fetchedPrinter.supplies.map(storeItem => {
        const {supply} = storeItem;
        return {
          storeId: storeItem.id,
          name: supply.name,
          installedAt: storeItem.installedAt,
        }
      })
    } as PrinterWithHistory;
    res.json({
      msg: 'Succeed',
      data: [printer]
    } as PrinterRespond);
  } catch (e) {
    const er = new ValidationError(e.message)
    next(er);
  }


};

export const addPrinter = async (req: Request, res: Response, next: NextFunction) => {
  const { name, ip, area, isMultifunctional, location, model } = req.body as AddPrinterRequest;

  try {

    const printerToAdd = new PrinterEntity();
    printerToAdd.name = name;
    printerToAdd.ip = ip;
    printerToAdd.model = model;
    printerToAdd.isMultifunctional = isMultifunctional;
    printerToAdd.area = area;
    printerToAdd.location = location;
    await printerToAdd.save();

    res.json({
      msg: 'Succeed',
      data: [printerToAdd],
    } as unknown as PrinterRespond);
  } catch (e) {
    const er = new ValidationError(e.message)
    next(er);
  }
};

export const updatePrinter = async (req: Request, res: Response, next: NextFunction) => {
  const { name, ip, area, isMultifunctional, location, model } = req.body as AddPrinterRequest;
  const { id } = req.params;

  // sends error when id param is undefined.
  // @todo add validation of id param. It should return fail respond message when id param is undefined.
  if (!id) return res.json({ msg: 'Fails' } as PrinterRespond);

  const fetchedPrinter = await PrinterEntity.findOne({ where: { id } });
  // sends error when printer was not found.
  if (fetchedPrinter === null) return next(new ValidationError('the printer was not found.'));
  try {
    fetchedPrinter.name = name;
    fetchedPrinter.ip = ip;
    fetchedPrinter.model = model;
    fetchedPrinter.isMultifunctional = isMultifunctional;
    fetchedPrinter.area = area;
    fetchedPrinter.location = location;
    await fetchedPrinter.save();
    // @todo add validation
    // @todo can not change model if the printer has already been supplied.
    res.json({
      msg: 'Succeed',
      data: [fetchedPrinter],
    } as unknown as PrinterRespond);

  } catch (e) {
    const er = new ValidationError(e.message)
    next(er);
  }
};

export const deletePrinter = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  // sends error when id param is undefined.
  if (!id) return res.json({ msg: 'Fails' } as PrinterRespond);

  const fetchedPrinter = await PrinterEntity.findOne({
    where: { id }, relations: {
      supplies: true,
    }
  });
  if (fetchedPrinter === null) return next(new ValidationError('the printer was not found.'));

  //if printer has installed supplies, we have to remove the supplies from the store.
  await AppDataSource
    .createQueryBuilder()
    .delete()
    .from(StoreEntity)
    .where('printerId = :id', { id: fetchedPrinter.id })
    .execute()

  await fetchedPrinter.remove();

  res.json({
    msg: 'Succeed',
    data: [],
  } as unknown as PrinterRespond);
};

export const installSupply = async (req: Request, res: Response, next: NextFunction) => {
  const { supplyId, printerId, } = req.params as unknown as InstallSupplyRequest;

  try {

    const [availableSupply] = await StoreEntity.find({
      relations: {
        supply: true,
        printer: true,
      },
      where: {
        supply: {
          id: supplyId,
        },
        isAvailable: true,
      }
    });

    if (availableSupply === undefined) return next(new ValidationError('the supply is not available.'));

    const [printer] = await PrinterEntity.find({
      relations: {
        supplies: true,
      },
      where: {
        id: printerId,
      }
    })

    if (printer === undefined) return next(new ValidationError('Invalid printer id.'));

    //cannot install an unsuitable supply.
    if (printer.model !== availableSupply.supply.model) return next(new ValidationError('can not install the unsuitable supply.'));

    availableSupply.printer = printer;
    availableSupply.isAvailable = false;
    availableSupply.installedAt = new Date();
    await availableSupply.save();

    printer.supplies.push(availableSupply);
    await printer.save()

    res.json({ msg: `${availableSupply.supply.name} has been installed at ${printer.name} printer.` })
  } catch (e) {
    next(e);
  }
};
