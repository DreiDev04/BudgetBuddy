import dbConnect from "@/lib/mongodb";
import Budget from "@/models/Budget";
import { User } from "@/models/User";
import { IBudget } from "@/types/budget-types";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
) => {
  try {
    // const { userId } = await auth()
    // console.log(userId);
    const userId = "user_2sHqdLaiBpIyeLFNKOwgTY4rX6w"; 

    await dbConnect();

    const dbUser = await User.findOne({ clerkId: userId });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userBudgets = await Budget.find({
      user: dbUser._id,
    });

    if (!userBudgets) {
      return NextResponse.json({ error: "Budget not found" }, { status: 404 });
    }

    return NextResponse.json(userBudgets as IBudget[], { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
