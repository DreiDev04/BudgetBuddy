import dbConnect from "@/lib/mongodb";
import Account from "@/models/Account";
import { User } from "@/models/User";
import { IAccount } from "@/types/account-types";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const GET = async (req: NextRequest) => {
  try {
    // const { userId } = await auth()
    // console.log(userId);
    const userId = "user_2sHqdLaiBpIyeLFNKOwgTY4rX6w"; // Clerk ID nung account ko

    await dbConnect();

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const accounts = await Account.find({ user: user._id });

    if (!accounts) {
      return NextResponse.json({ error: "No accounts found" }, { status: 404 });
    }
    const formattedAccounts = accounts.map((account) => {
      return {
        // _id: account._id,
        accountName: account.accountName,
        type: account.type,
        initialValue: account.initialValue,
      };
    });

    return NextResponse.json(formattedAccounts as IAccount[], { status: 200 });
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

    const account = new Account({ ...body, user: user._id });

    await account.save();
    revalidatePath("/dashboard");


    return NextResponse.json(
      { message: "Account created successfully" },
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
