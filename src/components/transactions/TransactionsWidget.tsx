import React from "react";
import { useFetchTransactions } from "../../hooks/useFetchTransactions";
import { TransactionTable } from "./TransactionTable";
import { useTransactionFilters } from "../../hooks/useTransactionFilters";

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

  if (isError || !data) {
    return (
      <div className="bg-white rounded-xl border border-red-200 shadow-sm p-6 text-center h-96 flex flex-col items-center justify-center">
        <p className="text-red-500 font-medium mb-4">
          Failed to load transactions.
        </p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-medium"
        >
          Try Again
        </button>
      </div>
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
