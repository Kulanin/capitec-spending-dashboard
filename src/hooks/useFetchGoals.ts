import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type {  GoalsResponse, } from "../types/api";
import { apiService } from "../api/client";
import { customerKeys } from "../utils/queryKeys";
import type { ApiError } from "../api/http";


export const useFetchGoals = (
  customerId: string,
): UseQueryResult<GoalsResponse, ApiError> => {
  return useQuery<GoalsResponse, ApiError>({
    queryKey: customerKeys.goals(customerId),
    queryFn: () => apiService.getGoals(customerId),
    staleTime: 60_000 * 2,
    gcTime: 60_000 * 5,
    retry: 2,
    enabled:Boolean(customerId)
  });
};
