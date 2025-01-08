import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  birthdate?: Date;
  gender?: "Female" | "Male" | "Other";
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    birthdate: { type: Date }, // Optional
    gender: { type: String, enum: ["Female", "Male", "Other"] }, // Optional with validation
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
