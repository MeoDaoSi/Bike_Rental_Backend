import { Request, Response } from 'express';
import { LocationModel } from '../models/Location';
import asyncHandler from '../helpers/asyncHandler'

export const createOne = asyncHandler(async (req: Request, res: Response) => {
    const { address } = req.body;
    const location = new LocationModel({
        address
    });
    location.save();
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

export const getAll = async (req: Request, res: Response) => {
    try {
        const locations = await LocationModel.find();
        return res.status(200).json(locations).end();
    } catch (error) {
        return res.status(400).json({ message: error }).end();
    }
}

export const updateOne = async (req: Request, res: Response) => {
    const location_id = req.params.id;
    const update_property_name = Object.keys(req.body);
    const allowed_updates = ['address'];
    const is_valid_update = update_property_name.every((update) => allowed_updates.includes(update));
    if (!is_valid_update) {
        res.status(400).json({ message: 'Invalid update property' }).end();
    }
    try {
        const location = await LocationModel.findByIdAndUpdate(location_id, req.body);
        return res.status(200).json(location);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
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