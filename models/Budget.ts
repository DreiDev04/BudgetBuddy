// models/Budget.js
import { Schema, model, models } from "mongoose";
import ColorSchema from "@/models/shared/ColorSchema";
import CategorySchema from "@/models/shared/CategorySchema";
import ExpenseSchema from "@/models/shared/ExpenseSchema";

const BudgetSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    budget: { type: Number, required: true },
    color: { type: [ColorSchema], required: true },
    categories: { type: [CategorySchema], required: true },
    expenses: { type: [ExpenseSchema], required: true },

    // Reference to User
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Budget = models.Budget || model("Budget", BudgetSchema);

export default Budget;
