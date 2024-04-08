import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import asyncHandler from '../helpers/asyncHandler';
import Bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../middlewares/auth';

export const register = asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) throw new Error('User already exists');
    const passwordHash = await Bcrypt.hash(req.body.password, 10);
    const newUser = await UserModel.create({ full_name: req.body.full_name, email: req.body.email, password: passwordHash });
    console.log(process.env.JWT_SECRET_KEY);

    const token = await jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET_KEY!);
    res.status(201).json({ newUser, token });
})

export const login = asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) throw new Error('User not found');
    const isValid = await Bcrypt.compare(req.body.password, user.password!);
    if (!isValid) throw new Error('Invalid password');
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY!);
    res.status(200).json({ user, token });
})

export const getAll = asyncHandler(async (req: Request, res: Response) => {
    const users = await UserModel.find();
    res.status(200).json({ users });
})

export const get = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    res.status(200).json({ user: req.user });
})

