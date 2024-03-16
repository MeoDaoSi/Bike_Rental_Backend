import express from 'express';
import auth from './auth';
import branch from './Branch';
import contract from './contract';

const router = express.Router();

router.use('/auth', auth);
router.use('/contract', contract);
router.use('/branch', branch);

export default router;
