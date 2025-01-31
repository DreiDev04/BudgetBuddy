// types/budget-types.ts
import { Document, Types } from "mongoose";
import { IColor, ICategory } from "./shared-types";
import { IExpense } from "./expense-types";

export interface IBudget extends Document {
  _id: string; //added
  title: string;
  description: string;
  budget: number;
  color: IColor[];
  categories: ICategory[];
  expenses: IExpense[];
  user: Types.ObjectId; // Add this field
  createdAt: Date;// added
}
