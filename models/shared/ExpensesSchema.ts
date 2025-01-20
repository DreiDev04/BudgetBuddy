// models/shared/ExpenseSchema.js
import { Schema } from 'mongoose';
import CategorySchema from './CategorySchema';

const ExpenseSchema = new Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: CategorySchema, required: true },
  date: { type: Date, required: true },
});

export default ExpenseSchema;
