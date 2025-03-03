"use server";

import dbConnect from "@/lib/mongodb";
import { User } from "@/models/user.model";
import { IUser } from "@/types/user-types";

export async function getUserData(_userId: string) {
  try {
    await dbConnect();
    const user = await User.findOne({ clerkId: _userId });

    if (!user) {
      throw new Error("Error: User not found");
    }

    return user as IUser;
  } catch (error) {
    console.error(error);
  }
}
