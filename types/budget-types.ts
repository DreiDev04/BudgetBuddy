import { Document } from "mongoose";

export interface IColor {
  name: string;
  hex: string;
}

export interface ICurrency {
  code: string;
  symbol: string;
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

  title: { type: StringConstructor; required: true };

  description: { type: StringConstructor; required: true };

  budget: { type: NumberConstructor; required: true };

  color: { type: ArrayConstructor; required: true };

  currency: { type: ArrayConstructor; required: true };

  categories: { type: ArrayConstructor; required: true };

  expenses: { type: ArrayConstructor; required: true };

}