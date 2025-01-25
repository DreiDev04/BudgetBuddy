// models/shared/ColorSchema.js
import { Schema } from "mongoose";

const ColorSchema = new Schema({
  name: { type: String, required: true },
  hex: { type: String, required: true },
});

export default ColorSchema;