import express from 'express';
import { createInfoUser } from '../controllers/user';

const router = express.Router();

router.post('/', createInfoUser)

export default router