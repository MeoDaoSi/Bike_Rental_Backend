import express from 'express';
import { getAll, create, getOne, update, remove } from '../controllers/bike';

const router = express.Router();

router.get(
    '/:branch_id',
    getAll
)

router.get(
    '/:id',
    getOne
)

router.post(
    '/',
    create
)

router.put(
    '/:id',
    update
)

router.delete(
    '/:id',
    remove
)

export default router;