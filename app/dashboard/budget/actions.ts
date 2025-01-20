"use server";

import dbConnect from "@/lib/mongodb";
import { User } from "@/models/User";

export async function getUserBudget(userId: string) {
  try {
    await dbConnect();

    const userBudget = await User.findOne({ userId }).populate("budget");
    return userBudget;
  } catch (error) {
    console.error(error);
  }
}


