import { CURRENCY } from "./constants";

export const getCurrencySymbol = (code: string) => {
  return CURRENCY.find((c) => c.code === code)?.symbol || code;
};
