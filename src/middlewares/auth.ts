import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "../helpers/asyncHandler";
import { UserModel } from "../models/User";
import User from "../models/User";

export interface AuthenticatedRequest extends Request {
    user?: User // Add the user property to the request
}

export const auth = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('Token not found');
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    if (!decoded) throw new Error('Invalid token');
    const user = await UserModel.findById(decoded._id);
    if (!user) throw new Error('User not found');
    req.user = user;
    next();
})