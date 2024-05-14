import { Request, Response } from 'express';
import { ContractModel } from '../models/Contract';
import asyncHandler from '../helpers/asyncHandler';
import { UserModel } from '../models/User';
import { BikeModel } from '../models/Bike';

let perPage = 8;

export const create = asyncHandler(async (req: Request, res: Response) => {
    let newUser = new UserModel();
    const user = await UserModel.findOne({
        email: req.body.email,
    })
    if (!user) {
        newUser = new UserModel({
            phone_number: req.body.phone_number,
            email: req.body.email,
            full_name: req.body.full_name,
            birth_date: req.body.birth_date,
            address: req.body.address,
        });
        await newUser.save();
    }
    const contact = new ContractModel({
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        pickup_address: req.body.pickup_address,
        return_address: req.body.return_address,
        total_price: req.body.total_price,
        duration: req.body.duration,
        bikes: req.body.cart,
        user: user?._id || newUser._id,
        staff: req.body?.staff,
    });
    await contact.save();
    return res.status(200).json(contact);
})

export const getOne = asyncHandler(async (req: Request, res: Response) => {
    const contact = await ContractModel.findById(req.params.contract_id)
        .populate('user')
        .populate('bikes')
        .lean()
        .exec();
    return res.status(200).json(contact);
})

export const getAll = asyncHandler(async (req: Request, res: Response) => {
    const page: number = Number(req.query.page) || 1;

    let query = {};
    if (req.query.status) {
        query = {
            ...query, status: req.query.status
        }
    }
    const contracts = await ContractModel.find(query)
        .populate('user')
        .populate('bikes')
        .limit(perPage)
        .skip((perPage * page) - perPage)
        .sort({ createdAt: -1 })
        .lean()
        .exec();
    return res.status(200).json(contracts);
})

export const getRevenue = asyncHandler(async (req: Request, res: Response) => {
    const contracts = await ContractModel.aggregate([
        {
            $match: {
                status: 'COMPLETED',
            },
        },
        {
            $group: {
                _id: { $month: '$createdAt' },
                total: { $sum: '$total_price' },
            },
        },
        { $sort: { _id: 1 } },
    ]);
    console.log(contracts);

    res.status(200).json(contracts);
})

export const update = asyncHandler(async (req: Request, res: Response) => {
    const contract = await ContractModel.findById(req.params.contract_id);
    if (!contract) {
        return res.status(404).json({ message: 'Contract not found' });
    }
    if (req.body.status == 'PROCESSING') {
        await BikeModel.updateMany(
            { _id: { $in: contract.bikes }, status: 'AVAILABLE' },
            { $set: { status: 'UNAVAILABLE' } }
        );
        contract.payment = true;
    }
    if (req.body.status == 'COMPLETED') {
        await BikeModel.updateMany(
            { _id: { $in: contract.bikes }, status: 'UNAVAILABLE' },
            { $set: { status: 'AVAILABLE' } }
        );
    }
    await ContractModel.updateOne({ _id: contract._id }, {
        status: req.body.status
    })

    return res.status(200).json();
})

export const findContractByUserId = asyncHandler(async (req: Request, res: Response) => {
    const contracts = await ContractModel.find({
        user: req.params.user_id,
    })
        .populate('bikes')
        .lean()
        .exec();
    return res.status(200).json(contracts);
})

export const remove = asyncHandler(async (req: Request, res: Response) => {

})