// models/ShoppingList.ts
import { Schema, model, models } from "mongoose";
import { IShoppingList } from "@/types/shoppingList-types";

const ShoppingListSchema = new Schema<IShoppingList>(
  {
    title: { type: String, required: true },
    link: { type: String },
    price: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const ShoppingList =
  models.ShoppingList ||
  model<IShoppingList>("ShoppingList", ShoppingListSchema);

export default ShoppingList;
