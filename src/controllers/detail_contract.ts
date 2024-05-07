import { Request, Response } from 'express';
import { Contract_Detail_Model } from '../models/Detail_Contract';
import asyncHandler from '../helpers/asyncHandler'

export const create1 = asyncHandler(async (req: Request, res: Response) => {
    console.log(req.body);

    return res.status(200).json(`File uploaded successfully`).end();
})