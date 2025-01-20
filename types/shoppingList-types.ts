import { Types, Document } from "mongoose";

export interface IShoppingList extends Document {
  title: string;
  link?: string;
  price: number;
  user: Types.ObjectId; // Add this field
}
