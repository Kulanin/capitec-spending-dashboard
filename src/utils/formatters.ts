

import type { Formatter, NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import type { LabelFormatter } from "recharts/types/component/Label";


const zarFormatter = new Intl.NumberFormat("en-ZA", {
  style: "currency",
  currency: "ZAR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});


export const formatZAR = (amount: number | null | undefined): string => {
  if (amount === null || amount === undefined || Number.isNaN(amount)) {
    return "R0.00";
  }

  const formatted = zarFormatter.format(amount);
  
  return formatted
    .replace(/\u00A0/g, " ")
    .replace(/R\s/, "R")     
    .replace(",", ".");     
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
    const numericValue = typeof value === "number" ? value : Number(value);
    
    if (Number.isNaN(numericValue)) {
      return "0%";
    }
    
    return `${numericValue}%`;
  };
};


export const getInitials = (name: string): string => {
  if (!name) return "?";
  
  return name
    .trim()
    .split(/\s+/) 
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};


