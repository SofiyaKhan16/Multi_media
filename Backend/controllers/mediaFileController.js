import BaseController from './baseController.js';
import MediaFile from '../models/mediaFile.js';
import cloudinary from '../config/cloudinary.js';
import fs from 'fs';

const baseMediaFileController = new BaseController(MediaFile);

const createMedia = async (req, res) => {
  try {
    // Check if file is present
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const filePath = req.file.path;
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: 'auto',
    });
    // Remove local file
    fs.unlinkSync(filePath);

    // Prepare document fields
    const {
      fileType = 'image', // fallback
      tags = [],
      description = '',
      createdBy = 'system',
    } = req.body;

    const mediaFile = new MediaFile({
      fileName: req.file.originalname,
      fileType,
      cloudinaryUrl: result.secure_url,
      cloudinaryPublicId: result.public_id,
      fileSize: req.file.size,
      tags: Array.isArray(tags) ? tags : tags ? tags.split(',') : [],
      description,
      createdBy,
    });
    await mediaFile.save();
    res.status(201).json(mediaFile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const mediaFileController = {
  ...baseMediaFileController,
  createMedia,
};

export default mediaFileController;
