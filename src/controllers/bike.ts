import { Request, Response } from 'express';
import { BikeModel } from '../models/bikes';

export const createOne = async (req: Request, res: Response) => {
    try {
        const location_id = req.params.location_id;
        const { name, year, color, license_plate, status, type, QR_code } = req.body;
        const bike = new BikeModel({
            name,
            year,
            color,
            license_plate,
            status,
            type,
            QR_code,
            location_id
        });
        console.log(bike);
        res.status(200).json(bike);
    } catch (error) {
        res.status(400).json({ message: error });
    }

}

export const getOne = async (req: Request, res: Response) => {
    const bike_id = req.params.id;
    try {
        const bike = await BikeModel.findById(bike_id);
        res.status(200).json(bike);
    } catch (error) {
        res.status(400).json({ message: error });
    }
}

export const getAll = async (req: Request, res: Response) => {
    try {
        const bikes = await BikeModel.find();
        res.status(200).json(bikes);
    } catch (error) {
        res.status(400).json({ message: error });
    }
}

export const updateOne = async (req: Request, res: Response) => {
    const bike_id = req.params.id;
    const update_property_name = Object.keys(req.body);
    const allowed_updates = ['name', 'year', 'brand', 'year', 'license_plate', 'status', 'QR_code'];
    const is_valid_update = update_property_name.every((update) => allowed_updates.includes(update));
    if (!is_valid_update) {
        res.status(400).json({ message: 'Invalid update property' }).end();
    }
    try {
        const bike = await BikeModel.findByIdAndUpdate(bike_id, req.body);
        return res.status(200).json(bike);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
}