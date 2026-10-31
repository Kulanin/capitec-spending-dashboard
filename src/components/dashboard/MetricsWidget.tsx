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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full animate-pulse"
      >
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-32 bg-gray-100 rounded-xl border border-gray-200"
          />
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
