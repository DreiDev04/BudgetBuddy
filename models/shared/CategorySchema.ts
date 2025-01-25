// models/shared/CategorySchema.js
import { Schema } from 'mongoose';
import ColorSchema from './ColorSchema';

const CategorySchema = new Schema({
  name: { type: String, required: true },
  color: { type: ColorSchema, required: true },
});

export default CategorySchema;
