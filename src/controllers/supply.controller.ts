import {NextFunction, Request, Response} from 'express';
import {SupplyEntity} from '../entities/supply.entity';
import {AddSupplyRequest, SuppliesByModelParam, SupplyParam, SupplyRespond} from '../../types';
import {ValidationError} from '../utils/error-handler';
import {checkSupplyAvailability, isAccurateModel, listSuppliesForPrinter} from "../utils/supply";

export const getAllSupplies = async (req: Request, res: Response, next: NextFunction) => {
  const allSupplies = await SupplyEntity.find();
  res.json({
    msg: 'Succeed',
    data: [...allSupplies],
  } as unknown as SupplyRespond)
};

export const getSupplyById = async (req: Request, res: Response, next: NextFunction) => {
  const {id} = req.params as SupplyParam
  if (!id) return res.json({msg: 'Fails'} as SupplyRespond)
  const fetchedSupply = await SupplyEntity.findOneBy({id});
  if (fetchedSupply === null) return next(new ValidationError('the supply was not found.'));
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
    res.json({msg: 'Succeed', data: [supplyToAdd]} as SupplyRespond)
  } catch (e) {
    next(e);
  }
};

export const updateSupply = async (req: Request, res: Response, next: NextFunction) => {
  const {name, model, code, printerId} = req.body as AddSupplyRequest;
  const {id} = req.params as SupplyParam
  // @todo add validation of id param. It should return fail respond message when id param is undefined.
  if (!id) return res.json({msg: 'Fails'} as SupplyRespond);
  try {
    const fetchedSupply = await SupplyEntity.findOneByOrFail({id});
    fetchedSupply.name = name;
    //@todo valid model
    fetchedSupply.model = model;
    fetchedSupply.code = code;
    await fetchedSupply
    res.json({msg: 'Succeed', data: [fetchedSupply]} as SupplyRespond)
  } catch (e) {
    //@todo figure out how to handle validation messages.
    next(e)
  }
};

export const deleteSupply = async (req: Request, res: Response, next: NextFunction) => {
  const {id} = req.params as SupplyParam
  // @todo add validation of id param. It should return fail respond message when id param is undefined.
  if (!id) return res.json({msg: 'Fails'} as SupplyRespond);
  try {
    // @todo change finding method to simply findOneBy.
    const fetchedSupply = await SupplyEntity.findOneByOrFail({id});
    await fetchedSupply.remove()
    res.json({msg: 'Succeed', data: []} as SupplyRespond)
  } catch (e) {
    //@todo figure out how to handle validation messages.
    next(e);
  }
};

export const getAvailableSupplies = async (req: Request, res: Response, next: NextFunction) => {
  const {model} = req.params as unknown as SuppliesByModelParam;
  if (!isAccurateModel(model)) return next(new ValidationError('model was invalid.'))
  const suppliesList = await listSuppliesForPrinter(model);
  const suppliesListWithTotals = await checkSupplyAvailability(suppliesList);
  res.json({
    msg: 'Succeed',
    data: suppliesListWithTotals
  } as unknown as SupplyRespond);
}

export const getSuppliesByModel = async (req: Request, res: Response, next: NextFunction) => {
  const {model} = req.params as unknown as SuppliesByModelParam;
  if (!isAccurateModel(model)) return next(new ValidationError('model was invalid.'))
  const suppliesList = await listSuppliesForPrinter(model);
  res.json({
    msg: 'Succeed',
    data: suppliesList
  } as unknown as SupplyRespond);
}