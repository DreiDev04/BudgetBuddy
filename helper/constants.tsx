export const CURRENCY = [
  { code: "PHP", symbol: "₱", name: "Philippine Peso" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "CHF", symbol: "Fr", name: "Swiss Franc" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
] as const;

export const CURRENCY_CODE = CURRENCY.map((CURRENCY) => CURRENCY.code);

export const ACCOUNT_TYPE = [
  "Cash",
  "Savings",
  "Investment",
  "Credit Card",
  "Other",
] as const;

export const INCOME_CATEGORY = [
  { name: "Salary", color: "hsl(var(--chart-1))" },
  { name: "Business", color: " hsl(var(--chart-2))" },
  { name: "Allowance", color: "hsl(var(--chart-3))" },
  { name: "Investments", color: "hsl(var(--chart-4))" },
  { name: "Freelance", color: "hsl(var(--chart-5))" },
  { name: "Gift", color: "hsl(var(--chart-6))" },
  { name: "Other", color: "hsl(var(--chart-7))" },
] as const;

export const INCOME_CATEGORY_NAME = INCOME_CATEGORY.map(
  (INCOME_CATEGORY) => INCOME_CATEGORY.name
);

export const EXPENSE_CATEGORY = [
  { name: "Food", color: "hsl(var(--chart-1))" },
  { name: "Transport", color: "hsl(var(--chart-2))" },
  { name: "Utilities", color: "hsl(var(--chart-3))" },
  { name: "Rent", color: "hsl(var(--chart-4))" },
  { name: "Health", color: "hsl(var(--chart-5))" },
  { name: "Entertainment", color: "hsl(var(--chart-6))" },
  { name: "Other", color: "hsl(var(--chart-7))" },
] as const;

export const TRANSACTION_TYPE = ["income", "expense"] as const;
