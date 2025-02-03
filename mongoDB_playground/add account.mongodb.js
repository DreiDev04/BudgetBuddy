const userId = ObjectId("6799a6b72de40d05a7c07370");

db.accounts.insertOne({
  accountName: "Savings Account",
  type: "Savings",
  initalValue: 1000,
  user: userId,
  createdAt: new Date(),
  updatedAt: new Date()
});