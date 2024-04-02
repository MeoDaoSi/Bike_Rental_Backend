import express from 'express';
import { register, get } from '../controllers/auth';
const router = express.Router();

router.get('/', get);
router.post('/register', register);

export default router;