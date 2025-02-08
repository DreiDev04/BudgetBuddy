import { Schema, model, models } from "mongoose";
import { IBudget } from "@/types/budget-types";
import ColorSchema from "./shared/ColorSchema";

const BudgetSchema = new Schema<IBudget>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    budgetLimit: { type: Number, required: true },
    color: { type: [ColorSchema], required: true },
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Budget = models.Budget || model<IBudget>("Budget", BudgetSchema);

export default Budget;
