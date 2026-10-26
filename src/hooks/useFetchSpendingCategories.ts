import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { CategorySpendingResponse, SpendingCategoriesParams, } from "../types/api";
import { apiService } from "../api/client";
import { customerKeys } from "../utils/queryKeys";


export const useFetchSpendingCategories = (
  customerId: string,
  params: SpendingCategoriesParams,
): UseQueryResult<CategorySpendingResponse, any> => {
  return useQuery<CategorySpendingResponse, any>({
    queryKey: customerKeys.spendingCategories(customerId,params),
    queryFn: () => apiService.getCategorySpending(customerId,params),
    staleTime: 60_000 * 2,
    gcTime: 60_000 * 5,
    retry: 2,
    enabled:Boolean(customerId)
  });
};
