export const currencies = [
  { code: "PHP", symbol: "₱", name: "Philippine Peso" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "CHF", symbol: "Fr", name: "Swiss Franc" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
];


export const accountTypes = [
  {
    value: "general",
    label: "General",
  },
  {
    value: "cash",
    label: "Cash",
  },
  {
    value: "savings",
    label: "Savings",
  },
  {
    value: "credit",
    label: "Credit Card",
  },
  {
    value: "savings-account",
    label: "Savings Account",
  },
  {
    value: "bonus",
    label: "Bonus",
  },
  {
    value: "insurance",
    label: "Insurance",
  },
  {
    value: "investment",
    label: "Investment",
  },
  {
    value: "loan",
    label: "Loan",
  },
  {
    value: "salary",
    label: "Salary",
  },
  {
    value: "utility",
    label: "Utility",
  },
  {
    value: "other",
    label: "Other",
  },
];

export const getCurrencySymbol = (code: string) => {
  return currencies.find((c) => c.code === code)?.symbol || code;
};
