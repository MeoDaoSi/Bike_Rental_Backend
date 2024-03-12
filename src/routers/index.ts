import express from 'express';
import auth from './auth';
import branch from './Branch';
import bike from './bike';

const router = express.Router();

router.use('/auth', auth);
router.use('/branch', branch);
router.use('/bike', bike);

export default router;
