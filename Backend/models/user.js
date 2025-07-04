import mongoose from 'mongoose';
import baseSchema from './baseSchema.js';

const user = new mongoose.Schema({
  ...baseSchema.obj,
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

export default mongoose.model('User', user);
