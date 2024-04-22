import express from 'express';
import auth from './auth';
import branch from './branch';
import contract from './contract';
import user from './user';

const router = express.Router();

router.use('/contract', contract);
router.use('/branch', branch);
router.use('/auth', auth);
router.use('/user', user);

export default router;
