import { Schema, model, models, Model } from "mongoose";
import { IBudget } from "@/types/budget-types";


const ColorSchema = new Schema({
  name: { type: String, required: true },
  hex: { type: String, required: true },
});


const CategorySchema = new Schema({
  name: { type: String, required: true },
  color: { type: ColorSchema, required: true },
});

const ExpenseSchema = new Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: CategorySchema, required: true },
  date: { type: Date, required: true },
});


const BudgetSchema = new Schema<IBudget>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    budget: { type: Number, required: true },
    color: { type: [ColorSchema], required: true },
    categories: { type: [CategorySchema], required: true },
    expenses: { type: [ExpenseSchema], required: true },
  },
  { timestamps: true }
);


const Budget: Model<IBudget> =
  models.Budget || model<IBudget>("Budget", BudgetSchema);

export default Budget;
