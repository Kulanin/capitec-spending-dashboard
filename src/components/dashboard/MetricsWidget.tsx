import { useFetchCustomerProfile } from "../../hooks/useFetchCustomerProfile";
import { useFetchSpendingSummary } from "../../hooks/useFetchSpendingSummary";
import type { PeriodOption } from "../../types/api";
import { WidgetError } from "../ui/WidgetError";
import { DashboardMetricsRow } from "./DashboardMetricsRow";

interface MetricsWidgetProps {
  customerId: string;
  period: PeriodOption;
}

export const MetricsWidget = ({ customerId, period }: MetricsWidgetProps) => {
  const {
    data: summary,
    isLoading: summaryLoading,
    isError: summaryError,
    refetch: refetchSummary,
  } = useFetchSpendingSummary(customerId, period);

  const { data: profile, isLoading: profileLoading } =
    useFetchCustomerProfile(customerId);

  if (summaryLoading || profileLoading) {
    return (
      <div
        data-testid="metrics-skeleton"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full animate-pulse min-h-[150px]"
      >
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between h-full min-w-0"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="h-4 w-24 bg-gray-200 rounded mt-1" />
              <div className="w-9 h-9 bg-gray-100 rounded-lg shrink-0" />
            </div>

            <div className="mt-4 flex flex-col min-w-0 gap-2">
              <div className="h-8 w-32 bg-gray-200 rounded" />
              <div className="h-3 w-20 bg-gray-100 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (summaryError || !summary || !profile) {
    return (
      <WidgetError
        title="Failed to load metrics."
        onRetry={refetchSummary}
        minHeight="min-h-[200px]"
      />
    );
  }

  return <DashboardMetricsRow profile={profile} summary={summary} />;
};
