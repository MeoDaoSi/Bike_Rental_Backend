import { Request, Response } from 'express';
import { Contract_Detail_Model } from '../models/Detail_Contract';
import asyncHandler from '../helpers/asyncHandler'

export const create1 = asyncHandler(async (req: Request, res: Response) => {
    console.log(req.file);
    if (req.file) {
        const rs = new Contract_Detail_Model({
            contract: req.params.contract_id,
            imgUrl: req.file.filename
        })
        await rs.save();
    }

    return res.status(200).json(`File uploaded successfully`).end();
})

export const getDetailInfo = asyncHandler(async (req: Request, res: Response) => {
    const contract_info = await Contract_Detail_Model.find({ contract: req.params.contract_id });
    console.log(contract_info);


    return res.status(200).json(contract_info).end();
})