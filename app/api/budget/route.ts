import dbConnect from "@/lib/mongodb";
import Budget from "@/models/Budget";
import { User } from "@/models/User";
import { IBudget } from "@/types/budget-types";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const GET = async (req: NextRequest) => {
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

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    // const { userId } = await auth()
    // console.log(userId);
    const userId = "user_2sHqdLaiBpIyeLFNKOwgTY4rX6w"; // Clerk ID nung account ko

    await dbConnect();

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const budget = new Budget({
      ...body,
      user: user._id,
    });

    await budget.save();
    revalidatePath("/dashboard/budget");

    return NextResponse.json(
      { message: "Budget created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
