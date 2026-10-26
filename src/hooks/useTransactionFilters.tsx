import { useSearchParams } from "react-router-dom";
import type { SortOption } from "../types/api";
import type { GetTransactionsParams } from "../types/api";

const DEFAULT_FILTERS = {
  category: "All",
  sortBy: "date_desc" as SortOption,
  offset: 0,
  limit: 20,
  startDate: "",
  endDate: "",
};

export const useTransactionFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: Required<GetTransactionsParams> = {
    category: searchParams.get("category") || DEFAULT_FILTERS.category,
    sortBy:
      (searchParams.get("sortBy") as SortOption) || DEFAULT_FILTERS.sortBy,
    offset: Number(searchParams.get("offset")) || DEFAULT_FILTERS.offset,
    limit: Number(searchParams.get("limit")) || DEFAULT_FILTERS.limit,
    startDate: searchParams.get("startDate") || DEFAULT_FILTERS.startDate,
    endDate: searchParams.get("endDate") || DEFAULT_FILTERS.endDate,
  };

  const setFilters = (newFilters: Partial<GetTransactionsParams>) => {
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);

        Object.entries(newFilters).forEach(([key, value]) => {
          if (
            value === undefined ||
            value === null ||
            value === "" ||
            (key === "category" && value === "All")
          ) {
            params.delete(key);
          } else {
            params.set(key, String(value));
          }
        });

        return params;
      },
      { replace: true },
    );
  };

  return { filters, setFilters };
};
