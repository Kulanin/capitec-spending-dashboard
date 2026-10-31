import { useFetchFilters } from "../../hooks/useFetchFilters";
import { useDashboardFilters } from "../../hooks/useDashboardFilters";
import { DateRangeFilter } from "./DateRangeFilter";
import { WidgetError } from "../ui/WidgetError";

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
      <WidgetError
        title="Failed to load filters."
        onRetry={refetch}
        minHeight="min-h-[20px]"
      />
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
