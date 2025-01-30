const userId = ObjectId("6799a6b72de40d05a7c07370");

db.budgets.findOne({ user: userId });
