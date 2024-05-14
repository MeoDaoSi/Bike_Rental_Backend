import express from 'express'
import { getOne, getAll, create, update, findContractByUserId, getRevenue } from '../controllers/contract'
import { create1, getDetailInfo } from '../controllers/detail_contract'
const path = require('path');

import multer from 'multer';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({ storage })

const router = express.Router()

router.get('/', getAll)
router.get('/revenue', getRevenue)
router.get('/:contract_id/upload', upload.single('file'), getDetailInfo)
router.get('/:contract_id', getOne)
router.get('/profile/:user_id', findContractByUserId)
router.post('/:contract_id/upload', upload.single('file'), create1)
router.put('/:contract_id', update)
router.post('/', create)

export default router