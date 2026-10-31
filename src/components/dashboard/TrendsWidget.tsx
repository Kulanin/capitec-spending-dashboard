import { useFetchSpendingTrends } from "../../hooks/useFetchSpendingTrends";
import { MonthlyTrendsChart } from "../charts/MonthlyTrendsChart";
import { getMonthsFromPeriod } from "../../utils/dateHelpers";
import type { PeriodOption } from "../../types/api";
import { WidgetError } from "../ui/WidgetError";

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
      <WidgetError
        title="Failed to load spending trends."
        onRetry={refetch}
        minHeight="min-h-[350px]"
      />
    );
  }

  return <MonthlyTrendsChart trends={data.trends} />;
};
