import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type {  FilterPresetsResponse } from "../types/api";
import { apiService } from "../api/client";
import { customerKeys } from "../utils/queryKeys";

export const useFetchFilters = (
  customerId: string,
): UseQueryResult<FilterPresetsResponse, any> => {
  return useQuery<FilterPresetsResponse, any>({
    queryKey: customerKeys.filters(customerId),
    queryFn: () => apiService.getFilters(customerId),
    staleTime: 60_000 * 2,
    gcTime: 60_000 * 5,
    retry: 2,
  });
};
