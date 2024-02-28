import express from 'express';
import auth from './auth';
import location from './location';
import bike from './bike';

const router = express.Router();

router.use('/auth', auth);
router.use('/bike', bike);
router.use('/location', location);

export default router;
