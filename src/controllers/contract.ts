import { Request, Response } from 'express';
import { ContractModel } from '../models/Contract';
import asyncHandler from '../helpers/asyncHandler';
import { UserModel } from '../models/User';

export const create = asyncHandler(async (req: Request, res: Response) => {
    let newUser = new UserModel();
    const user = await UserModel.findOne({
        email: req.body.email,
    })
    if (!user) {
        newUser = new UserModel({
            phone_number: req.body.phone_number,
            email: req.body.email,
        });
        await newUser.save();
    }
    console.log("test" + req.body.cart);
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

})

export const getAll = asyncHandler(async (req: Request, res: Response) => {
    const contacts = await ContractModel.find()
        .populate('user')
        .populate('bikes')
        .lean()
        .exec();
    return res.status(200).json(contacts);
})

export const update = asyncHandler(async (req: Request, res: Response) => {
    const contact = await ContractModel.findById(req.params.id);
    if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
    }

    if (req.body.start_date) contact.start_date = req.body.start_date;
    if (req.body.end_date) contact.end_date = req.body.end_date;
    if (req.body.pickup) contact.pickup_address = req.body.pickup_address;
    if (req.body.return) contact.return_address = req.body.return_address;
    if (req.body.status) contact.status = req.body.status;
    if (req.body.total_price) contact.total_price = req.body.total_price;
    if (req.body.duration) contact.duration = req.body.duration;
    if (req.body.bike_id) contact.bikes = req.body.bike_id;
    if (req.body.user_id) contact.user = req.body.user_id;

    await ContractModel.updateOne({ $set: contact })
        .lean()
        .exec();
    return res.status(200).json();
})

export const remove = asyncHandler(async (req: Request, res: Response) => {

})