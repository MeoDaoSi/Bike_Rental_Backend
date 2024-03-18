import { Request, Response } from 'express';
import { BikeModel } from '../models/Bike';
import { ContractModel } from '../models/Contract';
import asyncHandler from '../helpers/asyncHandler';

export const create = asyncHandler(async (req: Request, res: Response) => {
    const bike = new BikeModel({
        brand: req.body.brand,
        model: req.body.model,
        imgUrl: req.body.imgUrl,
        year: req.body.year,
        color: req.body.color,
        license_plate: req.body.license_plate,
        price: req.body.price,
        status: req.body.status,
        type: req.body.type,
        branch: req.params.branch_id,
    });
    await bike.save();
    console.log(bike);
    return res.status(200).json(bike);
})

export const getOne = asyncHandler(async (req: Request, res: Response) => {
    console.log(req.params.bike_id);

    const bike = await BikeModel.findById(req.params.bike_id);
    console.log(bike?.branch.address);

    return res.status(200).json(bike);
})

export const getAllMatch = asyncHandler(async (req: Request, res: Response) => {

    const start_date = new Date(req.query.start_date as string);
    const end_date = new Date(req.query.end_date as string);

    let query: {
        status: string,
        branch: string
    } = {
        status: "AVAILABLE",
        branch: req.params.branch_id
    }

    console.log(query);


    let bikes = await BikeModel.find(
        query
    )

    console.log(bikes);


    const constract = await ContractModel.find({
        status: "ACCEPTED",
    })
    if (!constract) {
        return res.status(200).json(bikes);
    }

    const dupBike = constract.map((contract) => {
        if (end_date < new Date(contract.start_date) || start_date > new Date(contract.end_date)) {
            return
        }
        return contract.bikes;
    });
    const flatBike = dupBike.flat();

    const bookedBikeIds = flatBike.map((bike) => bike?.toString());

    const newBikes = bikes.filter(bike => !bookedBikeIds.includes(bike._id.toString()));

    return res.status(200).json(newBikes);
})

export const getAll = asyncHandler(async (req: Request, res: Response) => {
    console.log(req.query);

    let query = {};
    if (req.params) {
        query = { ...query, branch: req.params.branch_id }
    }
    if (req.query.status) {
        query = {
            ...query, status: req.query.status
        }
    }
    console.log(query);

    if (req.query.type) {
        query = { ...query, type: req.query.type }
    }

    const bikes = await BikeModel.find(query)
        .populate({
            path: 'branch',
            select: 'address',
        })
        .sort()
        .lean()
        .exec();
    console.log(bikes);

    return res.status(200).json(bikes);
})

export const update = asyncHandler(async (req: Request, res: Response) => {
    const bike = await BikeModel.findById(req.params.bike_id);
    console.log(bike);


    if (!bike) throw new Error('Bike not found');

    if (req.body.brand) bike.brand = req.body.brand;
    if (req.body.model) bike.model = req.body.model;
    if (req.body.imgUrl) bike.imgUrl = req.body.imgUrl;
    if (req.body.year) bike.year = req.body.year;
    if (req.body.color) bike.color = req.body.color;
    if (req.body.license_plate) bike.license_plate = req.body.license_plate;
    if (req.body.price) bike.price = req.body.price;
    if (req.body.status) bike.status = req.body.status;
    if (req.body.type) bike.type = req.body.type;
    if (req.body.branch) bike.branch = req.body.branch;

    await BikeModel.updateOne({ _id: bike._id }, { $set: { ...bike } })
        .lean()
        .exec()
    return res.status(200).json();
})

export const remove = asyncHandler(async (req: Request, res: Response) => {
    const bike_id = req.params.id;
    const bike = await BikeModel.findByIdAndDelete(bike_id);
    return res.status(200).json(bike);
})