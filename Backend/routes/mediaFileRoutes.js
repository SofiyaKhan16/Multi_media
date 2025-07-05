import express from 'express';
import multer from 'multer';
import mediaFileController from '../controllers/mediaFileController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', mediaFileController.getAll);
router.get('/:id', mediaFileController.getById);
router.post('/', upload.single('file'), mediaFileController.createMedia);

export default router;
