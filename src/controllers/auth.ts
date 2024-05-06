import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import asyncHandler from '../helpers/asyncHandler';
import Bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../middlewares/auth';

export const register = asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.findOne({ email: req.body.email });
    console.log(req.body.phone_number);

    if (user) {
        if (user.verified) {
            throw new Error('User already exists');
        }
        user.password = await Bcrypt.hash(req.body.password, 10);
        user.verified = true;
        await UserModel.updateOne({ _id: user._id }, { $set: { ...user } })
            .lean()
            .exec()

        res.status(200).json().end();
    }
    const passwordHash = await Bcrypt.hash(req.body.password, 10);
    const newUser = await UserModel.create({
        full_name: req.body.full_name,
        email: req.body.email,
        password: passwordHash,
        phone_number: `0${req.body.phone_number}`,
        address: req.body.address,
        verified: true
    });
    console.log(process.env.JWT_SECRET_KEY);

    const token = await jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET_KEY!);
    res.status(201).json({ newUser, token });
})

export const login = asyncHandler(async (req: Request, res: Response) => {
    console.log(req.body);

    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) throw new Error('User not found');
    console.log(user);

    const isValid = await Bcrypt.compare(req.body.password, user.password!);
    console.log(isValid);

    if (!isValid) throw new Error('Invalid password');
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY!, {
        expiresIn: `${process.env.ACCESS_TOKEN_VALIDITY_SEC}d`,
    });
    res.status(200).json({ user, token });
})

export const getAll = asyncHandler(async (req: Request, res: Response) => {
    const users = await UserModel.find();
    res.status(200).json({ users });
})

export const get = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    res.status(200).json({ user: req.user });
})

