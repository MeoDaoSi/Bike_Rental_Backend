import express from 'express';
import auth from './auth';
import branch from './Branch';
import contract from './contract';

const router = express.Router();

router.use('/contract', contract);
router.use('/branch', branch);
router.use('/auth', auth);

export default router;
