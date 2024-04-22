import express from 'express'
import { getOne, getAll, create, update } from '../controllers/contract'

const router = express.Router()

router.get('/', getAll)
router.get('/:contract_id', getOne)
router.put('/:contract_id', update)
router.post('/', create)

export default router