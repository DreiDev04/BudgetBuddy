const incomeCategories = [
  "Salary",
  "Business",
  "Allowance",
  "Investments",
  "Freelance",
  "Gift",
  "Other"
];

const expenseCategories = [
  "Food",
  "Transport",
  "Utilities",
  "Rent",
  "Health",
  "Entertainment",
  "Other"
];

const incomes = Array.from({ length: 20 }, (_, i) => ({
  label: `Income ${i + 1}`,
  amount: Math.floor(Math.random() * 50000) + 10000, // Random amount between 10,000 and 50,000
  transactionType: "income",
  category: incomeCategories[Math.floor(Math.random() * incomeCategories.length)],
  isDeleted: false,
  account: ObjectId("67c55dcdadb2c64a511bb920")
}));

const expenses = Array.from({ length: 20 }, (_, i) => ({
  label: `Expense ${i + 1}`,
  amount: Math.floor(Math.random() * 10000) + 1000, // Random amount between 1,000 and 10,000
  transactionType: "expense",
  category: expenseCategories[Math.floor(Math.random() * expenseCategories.length)],
  isDeleted: false,
  account: ObjectId("67c55dcdadb2c64a511bb920")
}));

const result = db.accountbudgets.insertMany([...incomes, ...expenses]);

print("Inserted Budget IDs:", result.insertedIds);

db.accounts.updateOne(
  { _id: ObjectId("67c55dcdadb2c64a511bb920") },
  {
    $push: {
      accountBudgets: { $each: Object.values(result.insertedIds) }
    }
  }
);

const updatedAccount = db.accounts.findOne({ _id: ObjectId("67c55dcdadb2c64a511bb920") });
print("Updated Account:", updatedAccount);
