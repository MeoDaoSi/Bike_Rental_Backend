import express from 'express'
import { getAll } from '../controllers/user'

const router = express.Router()

router.get('/', getAll)

export default router