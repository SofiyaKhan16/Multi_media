import express from 'express';
import upload from '../config/multer.js';
import mediaFileController from '../controllers/mediaFileController.js';

const router = express.Router();

router.get('/', mediaFileController.getAll);
router.get('/:id', mediaFileController.getById);
router.post('/', upload.single('file'), mediaFileController.createMedia);

export default router;
