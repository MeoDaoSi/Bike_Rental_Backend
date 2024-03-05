import { Request, Response } from 'express';
import { LocationModel } from '../models/Location';
import asyncHandler from '../helpers/asyncHandler'

export const createOne = asyncHandler(async (req: Request, res: Response) => {
    const location = new LocationModel({
        address: req.body.address,
    });
    await location.save();
    console.log(location);
    res.status(200).json(location);
})

export const getOne = async (req: Request, res: Response) => {
    const location_id = req.params.id;
    try {
        const location = await LocationModel.findById(location_id);
        return res.status(200).json(location);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
}

export const getAll = asyncHandler(async (req: Request, res: Response) => {
    const locations = await LocationModel.find();
    return res.status(200).json(locations).end();
})

export const updateOne = async (req: Request, res: Response) => {
    const location = await LocationModel.findById(req.params.id);
    if (!location) {
        return res.status(404).json({ message: 'Location not found' });
    }
    location.address = req.body.address;
    
    await LocationModel.updateOne({ _id: location._id }, { $set: { ...location } });
    return res.status(200).json();
}

export const removeOne = async (req: Request, res: Response) => {
    const location_id = req.params.id;
    try {
        const bike = await LocationModel.findByIdAndDelete(location_id);
        return res.status(200).json(bike).end();
    } catch (error) {
        return res.status(400).json({ message: error }).end();
    }
}