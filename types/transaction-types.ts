// types/budget-types.ts
import { Document, Types } from "mongoose";

export interface ITransaction extends Document {
  _id: string;
  account: Types.ObjectId;
  amount: number;
  type: string;
  category: Types.ObjectId;
  description: string;
}
