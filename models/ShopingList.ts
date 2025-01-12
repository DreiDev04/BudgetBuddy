import { IShoppingList } from "@/types/shoppingList-types";
import mongoose, { Schema, Model } from "mongoose";

const UserSchema: Schema<IShoppingList> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

const ShoppingList: Model<IShoppingList> = mongoose.models.ShoppingList || mongoose.model<IShoppingList>("ShoppingList", UserSchema);

export default ShoppingList;