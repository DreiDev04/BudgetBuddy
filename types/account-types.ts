// types/budget-types.ts
import { Document, Types } from "mongoose";
import { IExpense } from "./expense-types";


export interface IAccount extends Document {
  _id: string;
  accountName: string;
  type: string;
  user: Types.ObjectId;
}
