import { Document } from "mongoose";

export interface IColor {
  name: string;
  hex: string;
}

export interface ICategory {
  name: string;
  color: IColor;
}

export interface IExpense {
  name: string;
  amount: number;
  category: ICategory;
  date: Date;
}

export interface IBudget extends Document {
  title: string;
  description: string;
  budget: number;
  color: IColor[];
  categories: ICategory[];
  expenses: IExpense[];
}
