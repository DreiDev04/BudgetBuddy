import { IUser } from "@/types/auth-types";
import mongoose, { Schema, Model } from "mongoose";

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { 
      type: String, 
      required: true, 
      unique: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address"] 
    },
    password: { 
      type: String, 
      required: true,
      minlength: [6, "Password must be at least 6 characters long"] 
    },
  },
  {
    timestamps: true, 
  }
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
