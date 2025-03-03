import { Schema, model, models, Types } from "mongoose";
import { IAccountShoppingList } from "@/types/shoping-types";

const AccountShoppingListSchema = new Schema<IAccountShoppingList>(
  {
    label: { type: String, required: true },
    account: { type: Schema.ObjectId, ref: "Account", required: true },
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const AccountShoppingList =
  models.AccountShoppingList ||
  model<IAccountShoppingList>("AccountShoppingList", AccountShoppingListSchema);

export { AccountShoppingList };
