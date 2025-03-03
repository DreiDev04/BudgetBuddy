import { Schema, model, models } from "mongoose";
import { IAccountBudgetCategory } from "@/types/budget-types";

const AccountBudgetCategorySchema = new Schema<IAccountBudgetCategory>(
  {
    categoryName: { type: String, required: true },
    color: { type: Schema.Types.ObjectId, ref: "CategoryColor" },
  },
  { timestamps: true }
);

const AccountBudgetCategory =
  models.AccountBudgetCategory || model<IAccountBudgetCategory>("AccountBudgetCategory", AccountBudgetCategorySchema);

export { AccountBudgetCategory };
