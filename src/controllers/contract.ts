import { Request, Response } from 'express';
import { ContactModel } from '../models/Contract';
import asyncHandler from '../helpers/asyncHandler';

export const create = asyncHandler(async (req: Request, res: Response) => {
    const contact = new ContactModel({
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        pickup: req.body.pickup,
        return: req.body.return,
        note: req.body.note,
        status: req.body.status,
        total_price: req.body.total_price,
        duration: req.body.duration,
        bike: req.body.bike_id,
        user: req.body.user_id,
    });
    await contact.save();
    return res.status(200).json(contact);
})

export const getOne = asyncHandler(async (req: Request, res: Response) => {
    
})

export const getAll = asyncHandler(async (req: Request, res: Response) => {
    
})

export const update = asyncHandler( async (req: Request, res: Response) => {
    const contact = await ContactModel.findById(req.params.id);
    if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
    }
    
    if (req.body.start_date) contact.start_date = req.body.start_date;
    if (req.body.end_date) contact.end_date = req.body.end_date;
    if (req.body.pickup) contact.pickup = req.body.pickup;
    if (req.body.return) contact.return = req.body.return;
    if (req.body.note) contact.note = req.body.note;
    if (req.body.status) contact.status = req.body.status;
    if (req.body.total_price) contact.total_price = req.body.total_price;
    if (req.body.duration) contact.duration = req.body.duration;
    if (req.body.bike_id) contact.bikes = req.body.bike_id;
    if (req.body.user_id) contact.user = req.body.user_id;
    
    await ContactModel.updateOne({ $set: contact })
        .lean()
        .exec();
    return res.status(200).json();
})

export const remove = asyncHandler(async (req: Request, res: Response) => {
    
})