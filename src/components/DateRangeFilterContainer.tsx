import { useFetchFilters } from "../hooks/useFetchFilters";
import { useDashboardFilters } from "../hooks/useDashboardFilters";
import { DateRangeFilter } from "./DateRangeFilter";

export const DateRangeFilterContainer = ({
  customerId,
}: {
  customerId: string;
}) => {
  const { data, isLoading, isError, refetch } = useFetchFilters(customerId);
  const { period, setPeriod } = useDashboardFilters();

  if (isLoading) {
    return (
      <div className="h-9 w-32 bg-gray-100 animate-pulse rounded-lg border border-gray-200" />
    );
  }

  if (isError || !data || !data.dateRangePresets) {
    return (
      <button
        onClick={() => refetch()}
        className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100 hover:bg-red-100 transition-colors"
      >
        <span>Failed to load filters.</span>
        <span className="font-semibold underline">Retry</span>
      </button>
    );
  }

  return (
    <DateRangeFilter
      presets={data?.dateRangePresets || []}
      selectedPeriod={period}
      onSelectPeriod={setPeriod}
    />
  );
};
