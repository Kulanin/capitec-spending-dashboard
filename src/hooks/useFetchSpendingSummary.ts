import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { PeriodOption, SpendingSummary } from "../types/api";
import { apiService } from "../api/client";
import { customerKeys } from "../utils/queryKeys";



export const useFetchSpendingSummary = (
  customerId: string,
  period: PeriodOption,
): UseQueryResult<SpendingSummary, any> => {
  return useQuery<SpendingSummary, any>({
    queryKey: customerKeys.summary(customerId,period),
    queryFn: () => apiService.getSpendingSummary(customerId,period),
    staleTime: 60_000 * 2,
    gcTime: 60_000 * 5,
    retry: 2,
    enabled:Boolean(customerId)
  });
};
