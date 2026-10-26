

import type { Formatter, NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import type { LabelFormatter } from "recharts/types/component/Label";

// Using the 'en-US' locale with the 'ZAR' currency code intentionally here.
// to fix issue with the comma (e.g., R 15 420,50 to R 15,420.50)
const zarFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "ZAR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});


export const formatZAR = (amount: number | null | undefined): string => {
  if (amount === null || amount === undefined || Number.isNaN(amount)) {
    return zarFormatter.format(0).replace("ZAR", "R");
  }

  return zarFormatter.format(amount).replace("ZAR", "R");
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-ZA", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};



export const formatTooltipZAR = (name?:string): Formatter<ValueType, NameType> => {
  return (value) => {
    const numericValue = typeof value === "number" ? value : Number(value || 0);
    return [formatZAR(numericValue), name];
  };
};

export const formatPercentLabel = (): LabelFormatter => {
  return (value) => {
    const numericValue = typeof value === "number" ? value : Number(value || 0);
    return `${numericValue}%`;
  };
};

