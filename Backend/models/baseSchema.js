import { Schema } from 'mongoose';

const baseSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  isActive: { type: Boolean, default: true, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true, default: 'system' },
  createdOn: { type: Date, required: true, default: Date.now },
  modifiedBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  modifiedOn: { type: Date, default: null }
}, { _id: false });

export default baseSchema;