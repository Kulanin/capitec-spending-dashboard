import { useFetchSpendingTrends } from "../../hooks/useFetchSpendingTrends";
import { MonthlyTrendsChart } from "../charts/MonthlyTrendsChart";
import { getMonthsFromPeriod } from "../../utils/dateHelpers";
import type { PeriodOption } from "../../types/api";
import { AlertCircle } from "lucide-react";

export const TrendsWidget = ({
  customerId,
  period,
}: {
  customerId: string;
  period: PeriodOption;
}) => {
  const monthsToFetch = getMonthsFromPeriod(period);

  const { data, isLoading, isError, refetch } = useFetchSpendingTrends(
    customerId,
    monthsToFetch,
  );

  if (isLoading) {
    return (
      <div className="bg-white p-5 rounded-xl border border-gray-200 h-full min-h-[300px] flex items-center justify-center animate-pulse">
        <div className="h-68 w-full bg-gray-100 rounded-lg" />
      </div>
    );
  }

  if (isError || !data || !data.trends) {
    return (
      <div className="bg-white p-5 rounded-xl border border-gray-200 h-full min-h-[350px] flex flex-col items-center justify-center text-center">
        <AlertCircle className="w-8 h-8 text-red-400 mb-3" />
        <p className="text-sm font-medium text-gray-700 mb-4">
          Failed to load spending trends.
        </p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-blue-50 text-blue-600 text-sm font-semibold rounded-lg hover:bg-blue-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          Try Again
        </button>
      </div>
    );
  }

  return <MonthlyTrendsChart trends={data.trends} />;
};
