// types/expense-types.ts
import { ICategory } from "./shared-types";

export interface IExpense {
  _id: string; //addedd
  name: string;
  amount: number;
  category: ICategory;
  date: Date;
}
