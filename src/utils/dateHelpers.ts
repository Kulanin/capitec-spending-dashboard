import type { PeriodOption } from "../types/api";

export const getDateRangeFromPeriod = (period: PeriodOption):{ startDate: string; endDate: string } => {
  const end = new Date();
  const start = new Date();

  switch (period) {
    case '7d': start.setDate(start.getDate() - 7); break;
    case '30d': start.setDate(start.getDate() - 30); break;
    case '90d': start.setDate(start.getDate() - 90); break;
    case '1y': start.setFullYear(start.getFullYear() - 1); break;
    default: start.setDate(start.getDate() - 30); // Default to 30d
  }


  const format = (d: Date) => d.toISOString().split('T')[0];
  
  return {
    startDate: format(start),
    endDate: format(end),
  };
};

export const getMonthsFromPeriod = (p: PeriodOption) => {
  switch (p) {
    case "7d":
      return 1;
    case "30d":
      return 3; // Show last 3 months to give context
    case "90d":
      return 6; // Show last 6 months
    case "1y":
      return 12; // Show last 12 months
    default:
      return 3;
  }
};