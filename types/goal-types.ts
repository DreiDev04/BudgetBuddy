import { Types, Document } from "mongoose";

export interface IGoal extends Document {
  title: string;
  target: string;
  progress: number;
  user: Types.ObjectId; // Add this field
}
