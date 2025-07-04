import express from 'express';
import multer from 'multer';
import cloudinary from '../utils/cloudinary.js';
import fs from 'fs';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// POST /api/upload - Uploads a file to Cloudinary
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: 'auto',
    });
    // Remove file from local uploads folder after upload
    fs.unlinkSync(filePath);
    res.json({ url: result.secure_url, public_id: result.public_id });
  } catch (error) {
    res.status(500).json({ error: 'Upload failed', details: error.message });
  }
});

export default router;
