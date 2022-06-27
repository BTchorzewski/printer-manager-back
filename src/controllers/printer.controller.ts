import { NextFunction, Request, Response } from 'express';
import { AddPrinterRequest, PrinterRespond } from '../../types';
import { PrinterEntity } from '../entities/printer.entity';

export const getAllPrinters = async (req: Request, res: Response, next: NextFunction) => {
  const printers = await PrinterEntity.find();
  res.json({
    msg: 'Succeed',
    data: [...printers],
  } as unknown as PrinterRespond);
};

export const getPrinterById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const fetchedPrinter = await PrinterEntity.findOne({ where: { id } })

  if (!fetchedPrinter) return res.json({
    msg: 'Fails'
  } as PrinterRespond)

  res.json({
    msg: 'Succeed',
    data: [fetchedPrinter],
  } as unknown as PrinterRespond);
};

export const addPrinter = async (req: Request, res: Response, next: NextFunction) => {
  const { name, ip, area, isMultifunctional, location, model } = req.body as AddPrinterRequest;

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
};

export const updatePrinter = async (req: Request, res: Response, next: NextFunction) => {
  const { name, ip, area, isMultifunctional, location, model } = req.body as AddPrinterRequest;
  const { id } = req.params;

  // sends error when id param is undefined.
  if (!id) return res.json({ msg: 'Fails' } as PrinterRespond);

  const fetchedPrinter = await PrinterEntity.findOne({ where: { id } });
  // sends error when printer was not found.
  if (!fetchedPrinter) return res.json({ msg: 'Fails' } as PrinterRespond);

  fetchedPrinter.name = name;
  fetchedPrinter.ip = ip;
  fetchedPrinter.model = model;
  fetchedPrinter.isMultifunctional = isMultifunctional;
  fetchedPrinter.area = area;
  fetchedPrinter.location = location;
  await fetchedPrinter.save();

  res.json({
    msg: 'Succeed',
    data: [fetchedPrinter],
  } as unknown as PrinterRespond);
};

export const deletePrinter = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  // sends error when id param is undefined.
  if (!id) return res.json({ msg: 'Fails' } as PrinterRespond);

  const fetchedPrinter = await PrinterEntity.findOne({ where: { id } });
  if (!fetchedPrinter) return res.json({ msg: 'Fails' } as PrinterRespond);

  await fetchedPrinter.remove();

  res.json({
    msg: 'Succeed',
    data: [],
  } as unknown as PrinterRespond);
};
