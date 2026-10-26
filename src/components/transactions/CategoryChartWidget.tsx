import { useFetchSpendingCategories } from "../../hooks/useFetchSpendingCategories";
import type { PeriodOption } from "../../types/api";
import { CategoryPieChart } from "../charts/CategoryPieChart";

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

  if (isError || !data) {
    return (
      <div className="bg-white rounded-xl border border-red-100 p-4 shadow-sm flex flex-col items-center justify-center h-full min-h-[300px]">
        <p className="text-sm text-red-500 mb-4">Failed to load categories.</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return <CategoryPieChart categories={data.categories} />;
};
