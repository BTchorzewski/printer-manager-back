import { NextFunction, Request, Response } from 'express';
import { SupplyEntity } from '../entities/supply.entity';
import { AddSupplyRequest, SupplyParam, SupplyRespond } from '../../types';

export const getAllSupplies = async (req: Request, res: Response, next: NextFunction) => {
  const allSupplies = await SupplyEntity.find();
  res.json({
    msg: 'Succeed',
    data: [...allSupplies],
  } as unknown as SupplyRespond)
};

export const getSupplyById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params as SupplyParam
  if (!id) return res.json({ msg: 'Fails' } as SupplyRespond)

  const fetchedSupply = await SupplyEntity.findOneBy({ id });
  if (!fetchedSupply) return res.json({ msg: 'Fails' } as SupplyRespond);

  res.json({
    msg: 'Succeed',
    data: [fetchedSupply],
  } as SupplyRespond)

};

export const addSupply = async (req: Request, res: Response, next: NextFunction) => {
  const {
    name,
    model,
    code,
  } = req.body as AddSupplyRequest;
  try {
    const supplyToAdd = new SupplyEntity();
    supplyToAdd.name = name;
    supplyToAdd.code = code;
    supplyToAdd.model = model;
    await supplyToAdd.save()
    res.json({ msg: 'Succeed', data: [supplyToAdd] } as SupplyRespond)
  } catch (e) {
    res.json({ msg: 'Fails' } as SupplyRespond)
  }


};

export const updateSupply = async (req: Request, res: Response, next: NextFunction) => {
};

export const deleteSupply = async (req: Request, res: Response, next: NextFunction) => {
};
