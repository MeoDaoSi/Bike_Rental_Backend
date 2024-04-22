import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import asyncHandler from '../helpers/asyncHandler'

export const getAll = asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.find();
    return res.status(200).json(user).end();
})