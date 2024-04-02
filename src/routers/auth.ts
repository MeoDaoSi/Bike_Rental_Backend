import express from 'express';
import { register, get } from '../controllers/auth';
import { auth } from '../middlewares/auth';

const router = express.Router();

router.post('/register', register);

router.use(auth);

router.get('/', get);

export default router;