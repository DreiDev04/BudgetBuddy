import { Document, Types } from "mongoose";

export interface IAccountBudget extends Document {
  label: string;
  amount: number;
  transactionType: "income" | "expense";
  category: Types.ObjectId;
  account: Types.ObjectId;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAccountBudgetCategory extends Document {
  categoryName: string;
  color: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICategoryColor extends Document {
  colorName: string;
  hslValue: string;
  createdAt?: Date;
  updatedAt?: Date;
}
