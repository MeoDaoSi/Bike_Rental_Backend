import { Response } from 'express';
import asyncHandler from '../helpers/asyncHandler';
import { UserModel } from '../models/User';
import { AuthenticatedRequest } from '../middlewares/auth';

export const createInfoUser = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const user = await UserModel.create(req.body);
    res.status(201).json({ user });
})