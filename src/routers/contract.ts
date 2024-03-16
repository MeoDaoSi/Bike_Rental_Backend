import express from 'express'
import { getOne, getAll, create } from '../controllers/contract'

const router = express.Router()

router.get('/', getAll)
router.get('/:branch_id', getOne)
router.post('/', create)

export default router