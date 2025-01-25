import { Schema, model, models, Types } from "mongoose";
import { IBudget } from "@/types/budget-types";
import ColorSchema from "./shared/ColorSchema";
import CategorySchema from "./shared/CategorySchema";
import ExpenseSchema from "./shared/ExpensesSchema";

const BudgetSchema = new Schema<IBudget>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    budget: { type: Number, required: true },
    color: { type: [ColorSchema], required: true },
    categories: { type: [CategorySchema], required: true },
    expenses: { type: [ExpenseSchema], required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Budget = models.Budget || model<IBudget>("Budget", BudgetSchema);

export default Budget;
