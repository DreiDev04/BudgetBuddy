import { Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  isOnboardingCompleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
