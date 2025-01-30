import { Types, Document } from "mongoose";

export interface IClerkUser extends Document {
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  isOnboardingCompleted: boolean;
  // budget?: Types.ObjectId; // Updated
  // goal?: Types.ObjectId; // Updated
  // shoppingList?: Types.ObjectId; // Updated
  createdAt?: Date;
  updatedAt?: Date;
}
