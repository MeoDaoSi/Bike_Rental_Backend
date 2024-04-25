import express from 'express'
import { getOne, getAll, create, update, findContractByUserId } from '../controllers/contract'

const router = express.Router()

router.get('/', getAll)
router.get('/:contract_id', getOne)
router.get('/profile/:user_id', findContractByUserId)
router.put('/:contract_id', update)
router.post('/', create)

export default router