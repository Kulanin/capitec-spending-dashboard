import { useFetchSpendingTrends } from "../../hooks/useFetchSpendingTrends";
import { getMonthsFromPeriod } from "../../utils/dateHelpers";
import type { PeriodOption } from "../../types/api";
import { WidgetError } from "../ui/WidgetError";
import { lazy, Suspense } from "react";
import { ChartSkeleton } from "../charts/ChartSkeleton";

const MonthlyTrendsChart = lazy(() =>
  import("../charts/MonthlyTrendsChart").then((module) => ({
    default: module.MonthlyTrendsChart,
  })),
);

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

  if (isError || (!isLoading && !data)) {
    return (
      <WidgetError
        title="Failed to load spending trends."
        onRetry={refetch}
        minHeight="min-h-[350px]"
      />
    );
  }

  return (
    <Suspense fallback={<ChartSkeleton />}>
      {isLoading || !data ? (
        <ChartSkeleton />
      ) : (
        <MonthlyTrendsChart trends={data.trends} />
      )}
    </Suspense>
  );
};
