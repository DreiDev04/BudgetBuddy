export interface IGoal {
  name: string;
  description: string;
  targetGoal: number;
  currentGoal: number;
  targetDate: Date;
  note: string;
  icon: string;
  color: Array<IColor>;
  currency: Array<ICurrency>;
  categories: Array<ICategory>;
}

export interface ICategory {
  id: string;
  name: string;
}

export interface ICurrency {
  code: string;
  symbol: string;
  name: string;
}

export interface IColor {
  name: string;
  hex: string;
}
