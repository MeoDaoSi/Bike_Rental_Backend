import express from 'express'
import { getOne, createOne, updateOne, removeOne, getAll } from '../controllers/location'
import bike from './bike';

const router = express.Router()

router.use('/:location_id/bike', bike);

router.get('/', getAll)
router.get('/:location_id', getOne)
router.post('/', createOne)
router.put('/:location_id', updateOne)
router.delete('/:location_id', removeOne)

export default router