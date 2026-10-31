import { useFetchSpendingCategories } from "../../hooks/useFetchSpendingCategories";
import type { PeriodOption } from "../../types/api";
import { CategoryPieChart } from "../charts/CategoryPieChart";
import { WidgetError } from "../ui/WidgetError";

interface CategoryChartWidgetProps {
  customerId: string;
  period: PeriodOption;
}

export const CategoryChartWidget = ({
  customerId,
  period,
}: CategoryChartWidgetProps) => {
  const { data, isLoading, isError, refetch } = useFetchSpendingCategories(
    customerId,
    { period },
  );

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex flex-col h-full min-h-[300px] animate-pulse">
        <div className="h-6 w-1/2 bg-gray-200 rounded mb-4" />
        <div className="h-36 w-36 bg-gray-100 rounded-full mx-auto my-4" />
        <div className="grid grid-cols-2 gap-2 mt-auto">
          <div className="h-8 bg-gray-100 rounded" />
          <div className="h-8 bg-gray-100 rounded" />
        </div>
      </div>
    );
  }

  if (
    isError ||
    !data ||
    !data.categories ||
    !data.dateRange ||
    !data.totalAmount
  ) {
    return (
      <WidgetError
        title="Failed to load categories"
        onRetry={refetch}
        minHeight="min-h-[350px]"
      />
    );
  }

  return <CategoryPieChart categories={data.categories} />;
};
