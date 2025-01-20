// types/expense-types.ts
import { ICategory } from "./shared-types";

export interface IExpense {
  name: string;
  amount: number;
  category: ICategory;
  date: Date;
}
