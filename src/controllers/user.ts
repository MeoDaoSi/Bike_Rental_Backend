import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import asyncHandler from '../helpers/asyncHandler'

export const getAll = asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.find();
    return res.status(200).json(user).end();
})

export const update = asyncHandler(async (req: Request, res: Response) => {


    console.log(req.params.user_id);

    const user = await UserModel.findById(req.params.user_id);
    console.log(user);


    if (!user) throw new Error('User not found');

    if (req.body.birth_date) user.birth_date = req.body.birth_date;
    if (req.body.full_name) user.full_name = req.body.full_name;
    if (req.body.phone_number) user.phone_number = req.body.phone_number;
    if (req.body.address) user.address = req.body.address;

    await UserModel.updateOne({ _id: user._id }, { $set: { ...user } })
        .lean()
        .exec()

    return res.status(200).json();
})