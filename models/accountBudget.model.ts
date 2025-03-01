import { Schema, model, models, Types } from "mongoose";
import { IAccountBudget } from "@/types/budget-types";

const AccountBudgetSchema = new Schema<IAccountBudget>(
  {
    label: { type: String, required: true },
    amount: { type: Number, required: true },
    transactionType: { type: String, enum: ["income", "expense"], required: true },
    category: { type: Schema.ObjectId, ref: "AccountBudgetCategory" },
    account: { type: Schema.ObjectId, ref: "Account", required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const AccountBudget = models.AccountBudget || model<IAccountBudget>("AccountBudget", AccountBudgetSchema);

export { AccountBudget };
