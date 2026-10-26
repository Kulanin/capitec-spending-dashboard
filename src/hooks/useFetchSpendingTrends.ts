import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { SpendingTrendsResponse } from "../types/api";
import { apiService } from "../api/client";
import { customerKeys } from "../utils/queryKeys";

export const useFetchSpendingTrends = (
  customerId: string,
  months: number,
): UseQueryResult<SpendingTrendsResponse, any> => {
  return useQuery<SpendingTrendsResponse, any>({
    queryKey: customerKeys.trends(customerId,months),
    queryFn: () => apiService.getTrends(customerId,months),
    staleTime: 60_000 * 2,
    gcTime: 60_000 * 5,
    retry: 2,
    enabled:Boolean(customerId)
  });
};
