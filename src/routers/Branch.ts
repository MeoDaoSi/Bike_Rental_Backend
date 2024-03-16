import express from 'express'
import { getOne, create, update, remove, getAll } from '../controllers/branch'
import bike from './bike';

const router = express.Router()

router.use(
    '/bike',
    bike
);

router.get(
    '/',
    getAll
)
router.get(
    '/:branch_id',
    getOne
)
router.post(
    '/',
    create
)
router.put(
    '/:branch_id',
    update
)
router.delete(
    '/:branch_id',
    remove
)

export default router