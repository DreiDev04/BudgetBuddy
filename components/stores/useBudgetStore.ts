import { create } from "zustand";

interface BudgetState {
  step: number;
  monthlyIncome: string;
  categories: { name: string; limit: number }[];
  setStep: (step: number) => void;
  setMonthlyIncome: (income: string) => void;
  addCategory: (category: { name: string; limit: number }) => void;
  resetOnboarding: () => void;
}

const useBudgetStore = create<BudgetState>((set) => ({
  step: 1,
  monthlyIncome: "",
  categories: [],
  setStep: (step) => set({ step }),
  setMonthlyIncome: (income) => set({ monthlyIncome: income }),
  addCategory: (category) =>
    set((state) => ({ categories: [...state.categories, category] })),
  resetOnboarding: () =>
    set({
      step: 1,
      monthlyIncome: "",
      categories: [],
    }),
}));

export default useBudgetStore;
