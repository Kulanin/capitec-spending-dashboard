import React from "react";
import { useFetchTransactions } from "../../hooks/useFetchTransactions";
import { TransactionTable } from "./TransactionTable";
import { useTransactionFilters } from "../../hooks/useTransactionFilters";
import { WidgetError } from "../ui/WidgetError";
import { TransactionTableSkeleton } from "./TransactionTableSkeleton";

export const TransactionsWidget: React.FC<{
  customerId: string;
  defaultStartDate: string;
  defaultEndDate: string;
}> = ({ customerId, defaultStartDate, defaultEndDate }) => {
  const { filters, setFilters } = useTransactionFilters();

  const apiParams = {
    ...filters,
    category: filters.category === "All" ? undefined : filters.category,
    startDate: filters.startDate || defaultStartDate || undefined,
    endDate: filters.endDate || defaultEndDate || undefined,
  };

  const { data, isLoading, isFetching, isError, refetch } =
    useFetchTransactions(customerId, apiParams);

  if (isLoading) {
    return <TransactionTableSkeleton />;
  }

  if (isError || !data) {
    return (
      <WidgetError
        title="Failed to load transactions."
        onRetry={refetch}
        minHeight="min-h-[400px]"
      />
    );
  }

  return (
    <div
      className={`transition-opacity duration-200 ${isFetching ? "opacity-50" : "opacity-100"}`}
    >
      <TransactionTable
        transactions={data.transactions}
        totalCount={data.pagination.total}
        hasMore={data.pagination.hasMore}
        filters={filters}
        onFilterChange={setFilters}
      />
    </div>
  );
};
