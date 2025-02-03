// types/budget-types.ts
import { Document, Types } from "mongoose";
import { IExpense } from "./expense-types";
import { IAccountType } from "./shared-types";

export interface IAccount extends Document {
  _id: string;
  accountName: string;
  type: IAccountType;
  initalValue: number;
  user: Types.ObjectId;
}
