import express from 'express';
import { getAllMatch, getAll, create, getOne, update, remove, getAllBike } from '../controllers/bike';

const router = express.Router();
router.get(
    '/:branch_id/book',
    getAllMatch
)

router.get(
    '/',
    getAllBike
)

router.get(
    '/:branch_id/:bike_id',
    getOne
)


router.get(
    '/:branch_id/',
    getAll
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