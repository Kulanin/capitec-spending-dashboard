import React from "react";
import { useFetchTransactions } from "../../hooks/useFetchTransactions";
import { TransactionTable } from "./TransactionTable";
import { useTransactionFilters } from "../../hooks/useTransactionFilters";
import { WidgetError } from "../ui/WidgetError";

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

  const { data, isLoading, isError, refetch } = useFetchTransactions(
    customerId,
    apiParams,
  );

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 animate-pulse h-96 flex items-center justify-center text-gray-400">
        Loading transactions...
      </div>
    );
  }

  if (isError || !data || !data.transactions || !data.pagination) {
    return (
      <WidgetError
        title="Failed to load transactions."
        onRetry={refetch}
        minHeight="min-h-[400px]"
      />
    );
  }

  return (
    <TransactionTable
      transactions={data.transactions}
      totalCount={data.pagination.total}
      hasMore={data.pagination.hasMore}
      filters={filters}
      onFilterChange={setFilters}
    />
  );
};
