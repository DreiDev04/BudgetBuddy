import { Schema, model, models, Types } from "mongoose";
import { IAccountShoppingListItem } from "@/types/shoping-types";

const AccountShoppingListItemSchema = new Schema<IAccountShoppingListItem>(
  {
    itemName: { type: String, required: true },
    price: { type: Number },
    shoppingList: { type: Schema.ObjectId, ref: "AccountShoppingList" },
  },
  { timestamps: true }
);

const AccountShoppingListItem =
  models.AccountShoppingListItem || model<IAccountShoppingListItem>("AccountShoppingListItem", AccountShoppingListItemSchema);

export { AccountShoppingListItem };
