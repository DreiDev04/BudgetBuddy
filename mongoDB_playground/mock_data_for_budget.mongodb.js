// Mock data insertion for Budget in MongoDB Playground

// Replace the userId with your provided user's ObjectId
const userId = ObjectId("6799a6b72de40d05a7c07370");

// Insert a Budget document with mock data for the given user
db.budgets.insertOne({
  title: "March Budget",
  description: "Budget plan for February 2025",
  budget: 6000,
  color: [
    { name: "Blue", hex: "#0000FF" },
    { name: "Green", hex: "#008000" },
  ],
  categories: [
    { name: "Food", color: { name: "Yellow", hex: "#FFFF00" } },
    { name: "Transportation", color: { name: "Gray", hex: "#808080" } },
  ],
  expenses: [
    {
      name: "Lunch at Cafe",
      amount: 200,
      category: { name: "Food", color: { name: "Yellow", hex: "#FFFF00" } },
      date: new Date("2025-02-05"),
    },
    {
      name: "Bus Pass",
      amount: 80,
      category: { name: "Transportation", color: { name: "Gray", hex: "#808080" } },
      date: new Date("2025-02-10"),
    },
  ],
  user: userId, 
  createdAt: new Date(),
  updatedAt: new Date(),
});
