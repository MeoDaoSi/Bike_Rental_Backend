import express from 'express';
import { getAllBikeByUser, create, getOne, update, remove } from '../controllers/bike';

const router = express.Router();

router.get(
    '/:branch_id/:bike_id',
    getOne
)

router.get(
    '/:branch_id/',
    getAllBikeByUser
)

router.get(
    '/:branch_id/book/',
)

router.post(
    '/:branch_id/',
    create
)

router.put(
    '/:branch_id/:bike_id',
    update
)

router.delete(
    '/:branch_id/:bike_id',
    remove
)

export default router;