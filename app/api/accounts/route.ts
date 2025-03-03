import dbConnect from "@/lib/mongodb";
import { Account } from "@/models/account.model";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { AccountBudget } from "@/models/accountBudget.model";

export const GET = async (req: NextRequest) => {
  try {
    const { userId } = await auth();

    await dbConnect();

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const accounts = await Account.find({ user: user._id })
      .populate({
        path: "accountBudgets",
        select: "label amount transactionType category isDeleted",
      })
      .select("accountName type currency isDeleted createdAt updatedAt");

    if (!accounts || accounts.length === 0) {
      return NextResponse.json({ error: "No accounts found" }, { status: 404 });
    }

    console.log("accountBudget", accounts);

    const payload = {
      isOnboardingCompleted: user.isOnboardingCompleted,
      accounts: accounts.map((account) => ({
        accountName: account.accountName,
        type: account.type,
        currency: account.currency,
        accountBudgets: account.accountBudgets.map((budget: any) => ({
          label: budget.label,
          amount: budget.amount,
          transactionType: budget.transactionType,
          category: budget.category,
        })),
      })),
    };

    return NextResponse.json(payload, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
