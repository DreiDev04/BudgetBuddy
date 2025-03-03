import dbConnect from "@/lib/mongodb";
import { Account } from "@/models/account.model";
import { AccountBudget } from "@/models/accountBudget.model";
import { User } from "@/models/user.model";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { accountType, accountName, currency, accountBudgets } =
      await req.json();

    console.log("Request Body:", {
      accountType,
      accountName,
      currency,
      accountBudgets,
    });

    // Parse accountBudgets if it's a JSON string
    const parsedBudget =
      typeof accountBudgets === "string"
        ? JSON.parse(accountBudgets)
        : accountBudgets;
    console.log("Parsed Account Budgets:", parsedBudget);

    await dbConnect();

    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    try {
      const account = new Account({
        accountName,
        type: accountType,
        currency,
        user: user._id,
      });
      await account.save();
      console.log("Account Saved:", account);

      const budget = new AccountBudget({
        label: parsedBudget.label,
        amount: parsedBudget.amount,
        transactionType: parsedBudget.transactionType,
        category: parsedBudget.category,
        isDeleted: parsedBudget.isDeleted || false,
        account: account._id,
      });

      await budget.save();
      console.log("Budget Saved:", budget);
      account.accountBudgets.push(budget._id);
      await account.save();
    } catch (error) {
      console.error("Error saving account:", error);
      return NextResponse.json(
        { error: "Error saving account" },
        { status: 500 }
      );
    }

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
