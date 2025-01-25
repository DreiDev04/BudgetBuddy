"use server";

import dbConnect from "@/lib/mongodb";
import { User } from "@/models/User";

export async function getUserBudget(userId: string) {
  try {
    await dbConnect();

    // Find the user and populate the budget field
    const userBudget = await User.findOne({ userId }).populate("budget");

    // Return the populated budget, or null if not found
    return userBudget ? userBudget.budget : null;
  } catch (error) {
    console.error("Error fetching user budget:", error);
    throw new Error("Failed to fetch user budget");
  }
}
