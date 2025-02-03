import dbConnect from "@/lib/mongodb";
import Account from "@/models/Account";
import { User } from "@/models/User";
import { IAccount } from "@/types/account-types";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { clerkId: string } }
) => {
  try {
    // const { clerkId } = params;

    // Since magiiba to sa account mo, comment out muna yung sa taas.
    // Balik mo nalang kapag di na nagdedebug sa front end
    const clerkId = "user_2sHqdLaiBpIyeLFNKOwgTY4rX6w"; // Clerk ID nung account ko

    await dbConnect();

    const user = await User.findOne({ clerkId });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const accounts = await Account.find({ user: user._id });

    if (!accounts) {
      return NextResponse.json({ error: "No accounts found" }, { status: 404 });
    }

    return NextResponse.json(accounts as IAccount[], { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
