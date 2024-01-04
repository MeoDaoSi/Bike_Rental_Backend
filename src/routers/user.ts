import express from 'express';
import { register, get } from '../controllers/auth';

export default (router: express.Router) => {
    router.get('/auth', get);
    router.post('/auth/register', register);
}