import { Request, Response } from 'express';
import { BranchModel } from '../models/Branch';
import asyncHandler from '../helpers/asyncHandler'

export const create = asyncHandler(async (req: Request, res: Response) => {
    const location = new BranchModel({
        address: req.body.address,
    });
    await location.save();
    console.log(location);
    res.status(200).json(location);
})

export const getOne = async (req: Request, res: Response) => {
    const branch_id = req.params.branch_id;

    try {
        const branch = await BranchModel.findById(branch_id);
        return res.status(200).json(branch);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
}

export const getAll = asyncHandler(async (req: Request, res: Response) => {
    const locations = await BranchModel.find();
    return res.status(200).json(locations).end();
})

export const update = async (req: Request, res: Response) => {

    const location = await BranchModel.findById(req.params.location_id);
    if (!location) {
        return res.status(404).json({ message: 'Location not found' });
    }
    location.address = req.body.address;

    await BranchModel.updateOne({ _id: location._id }, { $set: { ...location } });
    return res.status(200).json();
}

export const remove = async (req: Request, res: Response) => {
    const location_id = req.params.id;
    try {
        const bike = await BranchModel.findByIdAndDelete(location_id);
        return res.status(200).json(bike).end();
    } catch (error) {
        return res.status(400).json({ message: error }).end();
    }
}