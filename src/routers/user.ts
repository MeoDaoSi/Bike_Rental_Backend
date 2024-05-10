import express from 'express'
import { getAll, update } from '../controllers/user'

const router = express.Router()

router.get('/', getAll)
router.put('/:user_id', update)

export default router