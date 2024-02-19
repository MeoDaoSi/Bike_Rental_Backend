import express from 'express';
import { register, get } from '../controllers/auth';
const router = express.Router();

router.get('/auth', get);
router.post('/auth/register', register);

export default router;