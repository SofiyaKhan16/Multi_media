import BaseController from './baseController.js';
import MediaFile from '../models/mediaFile.js';
import cloudinary from '../config/cloudinary.js';
import fs from 'fs';
import AppError from '../utils/appError.js';

const baseMediaFileController = new BaseController(MediaFile);

const createMedia = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new AppError('No file uploaded', 400));
    }
    const filePath = req.file.path;
    let result;
    try {
      result = await cloudinary.uploader.upload(filePath, {
        resource_type: 'auto',
      });
    } catch (err) {
      fs.unlinkSync(filePath);
      return next(new AppError('Cloud upload failed: ' + err.message, 500));
    }
    fs.unlinkSync(filePath);
    const {
      fileType = 'image',
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
    return next(new AppError('Error creating media: ' + error.message, 500));
  }
};

const mediaFileController = {
  ...baseMediaFileController,
  createMedia,
};

export default mediaFileController;
