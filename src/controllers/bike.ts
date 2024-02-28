import { Request, Response } from 'express';
import { BikeModel } from '../models/Bike';
import asyncHandler from '../helpers/asyncHandler';

export const create = asyncHandler(async (req: Request, res: Response) => {
    const { brand, model, year, color, license_plate, status, type, location_id } = req.body;
    const bike = new BikeModel({
        brand,
        model,
        year,
        color,
        license_plate,
        status,
        type,
        location_id
    });
    await bike.save();
    console.log(bike);
    return res.status(200).json(bike);
})

export const getOne = asyncHandler(async (req: Request, res: Response) => {
    const bike_id = req.params.id;
    const bike = await BikeModel.findById(bike_id);
    return res.status(200).json(bike);
})

export const getAll = asyncHandler(async (req: Request, res: Response) => {
    const bikes = await BikeModel.find();
    return res.status(200).json(bikes);
})

export const update = asyncHandler(async (req: Request, res: Response) => {
    const bike = await BikeModel.findById(req.params.id);
    if (!bike) throw new Error('Bike not found');
    const data = BikeModel.updateOne({ _id: bike._id }, { $set: { ...bike } })
    return res.status(200).json(data);
})

export const remove = asyncHandler(async (req: Request, res: Response) => {
    const bike_id = req.params.id;
    const bike = await BikeModel.findByIdAndDelete(bike_id);
    return res.status(200).json(bike);
})