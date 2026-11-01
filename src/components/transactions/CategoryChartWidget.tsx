import { lazy, Suspense } from "react";
import { useFetchSpendingCategories } from "../../hooks/useFetchSpendingCategories";
import type { PeriodOption } from "../../types/api";
import { WidgetError } from "../ui/WidgetError";
import { CategorySkeleton } from "../charts/CategorySkeleton";

const CategoryPieChart = lazy(() =>
  import("../charts/CategoryPieChart").then((module) => ({
    default: module.CategoryPieChart,
  })),
);

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

  if (isError || (!isLoading && (!data || !data.categories))) {
    return (
      <WidgetError
        title="Failed to load categories."
        onRetry={refetch}
        minHeight="min-h-[350px]"
      />
    );
  }

  return (
    <Suspense fallback={<CategorySkeleton />}>
      {isLoading || !data?.categories ? (
        <CategorySkeleton />
      ) : (
        <CategoryPieChart categories={data.categories} />
      )}
    </Suspense>
  );
};
