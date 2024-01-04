import express from 'express';
import { UserModel } from '../models/users';

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const user = new UserModel(req.body);
        await user.save();
        const token = await user.generateAuthToken();
        console.log(user.password);

        res.status(201).json({ user, token });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const get = async (req: express.Request, res: express.Response) => {
    try {
        const users = await UserModel.find();
        res.status(200).json({ users });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}