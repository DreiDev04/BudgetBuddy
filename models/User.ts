import  { Schema, model, models } from "mongoose";
import { IClerkUserId } from "@/types/user-types";

const UserSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  username: { type: String }, 
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const User = models.User || model<IClerkUserId>("User", UserSchema);

export { User };
