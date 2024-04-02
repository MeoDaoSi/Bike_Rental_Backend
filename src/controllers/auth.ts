import express from 'express';
import { UserModel } from '../models/User';
import asyncHandler from '../helpers/asyncHandler';
import Bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = asyncHandler(async (req: express.Request, res: express.Response) => {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) throw new Error('User already exists');
    const passwordHash = await Bcrypt.hash(req.body.password, 10);
    const newUser = await UserModel.create({ email: req.body.email, password: passwordHash });
    console.log(process.env.JWT_SECRET_KEY!);
    const token = await jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET_KEY!);
    res.status(201).json(token);
})

export const get = async (req: express.Request, res: express.Response) => {
    try {
        const users = await UserModel.find();
        res.status(200).json({ users });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}