import express from 'express';
import auth from './auth';
import branch from './Branch';

const router = express.Router();

router.use('/auth', auth);
router.use('/branch', branch);

export default router;
