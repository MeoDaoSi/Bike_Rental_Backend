import express from 'express';
import auth from './auth';
import location from './location';
import bike from './location';

const router = express.Router();

router.use('/auth', auth);
router.use('/location', location);
router.use('/location/:id/bike', bike);

export default router;
