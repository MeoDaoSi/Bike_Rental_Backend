import express from 'express'
import { getOne, createOne, updateOne, removeOne, getAll } from '../controllers/location'
const router = express.Router()

router.get('/', getAll)
router.get('/:id', getOne)
router.post('/', createOne)
router.patch('/:id', updateOne)
router.delete('/:id', removeOne)

export default router