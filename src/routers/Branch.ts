import express from 'express'
import { getOne, createOne, updateOne, removeOne, getAll } from '../controllers/branch'
import bike from './bike';

const router = express.Router()

router.use('/bike', bike);

router.get('/', getAll)
router.get('/:branch_id', getOne)
router.post('/', createOne)
router.put('/:branch_id', updateOne)
router.delete('/:branch_id', removeOne)

export default router