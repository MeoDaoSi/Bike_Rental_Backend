import express from 'express';
import { register, get, login } from '../controllers/auth';
import { auth } from '../middlewares/auth';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.use(auth);

router.get('/me', get);

export default router;