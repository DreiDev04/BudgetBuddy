import { Document, Types } from "mongoose";

export interface IAccountGoal extends Document {
  goalName: string;
  targetAmount: number;
  savedAmount: number;
  deadline: Date;
  isCompleted: boolean;
  account: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}