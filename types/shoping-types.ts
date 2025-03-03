import { Document, Types } from "mongoose";

export interface IAccountShoppingList extends Document {
  label: string;
  account: Types.ObjectId;
  isCompleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAccountShoppingListItem extends Document {
  shoppingList: Types.ObjectId;
  itemName: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}