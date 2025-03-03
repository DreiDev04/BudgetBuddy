import { Schema, model, models, Types } from "mongoose";
import { IAccountBudget } from "@/types/budget-types";
import { INCOME_CATEGORY_NAME, TRANSACTION_TYPE } from "@/helper/constants";

const AccountBudgetSchema = new Schema<IAccountBudget>(
  {
    label: { type: String, required: true },
    amount: { type: Number, required: true },
    transactionType: { type: String, enum: TRANSACTION_TYPE, required: true },
    category: { type: String, enum: INCOME_CATEGORY_NAME, required: true },
    account: { type: Schema.ObjectId, ref: "Account", required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const AccountBudget =
  models.AccountBudget ||
  model<IAccountBudget>("AccountBudget", AccountBudgetSchema);

export { AccountBudget };
