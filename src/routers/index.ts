import express from 'express';
import register from './user';
const router = express.Router();

export default (): express.Router => {
    register(router);
    return router;
};