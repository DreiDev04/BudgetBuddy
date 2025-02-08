import dbConnect from "@/lib/mongodb";
import Account from "@/models/Account";
import { User } from "@/models/User";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    // const { userId } = await auth();
    const userId = "user_2sHqdLaiBpIyeLFNKOwgTY4rX6w";

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { accountType, accountName, budgetLimit, currency } =
      await req.json();

    await dbConnect();

    const user = await User.findOne({ clerkId: userId });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const newAccount = new Account({
      accountName: accountName, 
      type: accountType,
      currency: currency,
      budgetLimit,
      user: user._id,
    });

    await newAccount.save();

    user.isOnboardingCompleted = true;
    await user.save();

    return NextResponse.json(
      { message: "Resource created successfully" },
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
