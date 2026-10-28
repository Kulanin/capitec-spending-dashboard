import { useFetchCustomerProfile } from "../../hooks/useFetchCustomerProfile";
import { useFetchSpendingSummary } from "../../hooks/useFetchSpendingSummary";
import type { PeriodOption } from "../../types/api";
import { DashboardMetricsRow } from "./../DashboardMetricsRow";

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
      <div className="w-full p-6 bg-red-50 rounded-xl border border-red-100 flex flex-col items-center justify-center text-center">
        <p className="text-sm text-red-600 font-medium mb-3">
          Failed to load metrics.
        </p>
        <button
          onClick={() => refetchSummary()}
          className="px-4 py-2 bg-white text-red-600 border border-red-200 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return <DashboardMetricsRow profile={profile} summary={summary} />;
};
