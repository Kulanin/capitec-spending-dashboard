import React from "react";
import {
  Filter,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Calendar,
  SearchX,
  X,
} from "lucide-react";

import type {
  Transaction,
  SortOption,
  GetTransactionsParams,
} from "../../types/api";
import { TransactionRow } from "./TransactionRow";

export interface TransactionTableProps {
  transactions: Transaction[];
  totalCount: number;
  hasMore: boolean;
  filters: Required<
    Pick<
      GetTransactionsParams,
      "category" | "sortBy" | "offset" | "limit" | "startDate" | "endDate"
    >
  >;
  onFilterChange: (newFilters: Partial<GetTransactionsParams>) => void;
}

export const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  totalCount,
  hasMore,
  filters,
  onFilterChange,
}) => {
  const hasActiveFilters =
    filters.category !== "All" ||
    filters.startDate !== "" ||
    filters.endDate !== "";

  const handleClearFilters = () => {
    onFilterChange({
      category: "All",
      startDate: "",
      endDate: "",
      offset: 0,
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 sm:p-5 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Recent Transactions
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage and filter your overall spending activity
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="flex items-center gap-1 text-[11px] font-semibold text-red-600 bg-red-50 hover:bg-red-100 px-2.5 py-1.5 rounded-lg transition-colors"
            >
              <X className="w-3 h-3" />
              Clear Filters
            </button>
          )}

          <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm text-gray-700">
            <Calendar className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <span className="text-[11px] font-medium text-gray-400">From</span>
            <input
              type="date"
              value={filters.startDate || ""}
              onChange={(e) =>
                onFilterChange({ startDate: e.target.value, offset: 0 })
              }
              className="bg-transparent text-xs font-medium text-gray-800 focus:outline-none cursor-pointer w-[115px]"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm text-gray-700">
            <Calendar className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <span className="text-[11px] font-medium text-gray-400">To</span>
            <input
              type="date"
              value={filters.endDate || ""}
              onChange={(e) =>
                onFilterChange({ endDate: e.target.value, offset: 0 })
              }
              className="bg-transparent text-xs font-medium text-gray-800 focus:outline-none cursor-pointer w-[115px]"
            />
          </div>

          <div className="relative">
            <select
              value={filters.category}
              aria-label="Categories"
              onChange={(e) =>
                onFilterChange({ category: e.target.value, offset: 0 })
              }
              className="appearance-none bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-8 py-1.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer min-w-[150px]"
            >
              <option value="All">All Categories</option>
              <option value="Groceries">Groceries</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Transportation">Transportation</option>
              <option value="Dining">Dining</option>
              <option value="Utilities">Utilities</option>
            </select>
            <Filter className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={filters.sortBy}
              onChange={(e) =>
                onFilterChange({
                  sortBy: e.target.value as SortOption,
                  offset: 0,
                })
              }
              className="appearance-none bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-8 py-1.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer w-[140px]"
            >
              <option value="date_desc">Latest Date</option>
              <option value="date_asc">Oldest Date</option>
              <option value="amount_desc">Highest Amount</option>
              <option value="amount_asc">Lowest Amount</option>
            </select>
            <ArrowUpDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
              <th className="py-2.5 px-5">Merchant & Details</th>
              <th className="py-2.5 px-4">Category</th>
              <th className="py-2.5 px-4">Payment Method</th>
              <th className="py-2.5 px-4">Date</th>
              <th className="py-2.5 px-5 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {transactions.map((t) => (
              <TransactionRow key={t.id} t={t} />
            ))}
            {transactions.length === 0 && (
              <tr>
                <td colSpan={5} className="py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <SearchX className="w-8 h-8 mb-3 text-gray-300" />
                    <p className="text-sm font-medium text-gray-500">
                      No transactions found
                    </p>
                    <p className="text-xs mt-1">
                      Try adjusting your filters or date range.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="p-3.5 px-5 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between text-xs text-gray-500">
        <div>
          Showing{" "}
          <span className="font-semibold text-gray-700">
            {transactions.length === 0 ? 0 : filters.offset + 1}–
            {filters.offset + transactions.length}
          </span>{" "}
          of <span className="font-semibold text-gray-700">{totalCount}</span>{" "}
          results
        </div>
        <div className="flex items-center gap-2">
          <button
            disabled={filters.offset === 0}
            onClick={() =>
              onFilterChange({
                offset: Math.max(0, filters.offset - filters.limit),
              })
            }
            className="px-3 py-1 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 text-gray-600 font-medium disabled:opacity-50 flex items-center gap-1 shadow-sm transition-all"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Previous
          </button>
          <button
            disabled={!hasMore}
            onClick={() =>
              onFilterChange({ offset: filters.offset + filters.limit })
            }
            className="px-3 py-1 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 text-gray-600 font-medium disabled:opacity-50 flex items-center gap-1 shadow-sm transition-all"
          >
            Next <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
