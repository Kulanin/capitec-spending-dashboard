import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { CustomerProfile } from "../types/api";
import { apiService } from "../api/client";
import {  } from "./useFetchSpendingSummary";
import { customerKeys } from "../utils/queryKeys";


export const useFetchCustomerProfile = (
  customerId: string,
): UseQueryResult<CustomerProfile, any> => {
  return useQuery<CustomerProfile, any>({
    queryKey: customerKeys.profile(customerId),
    queryFn: () => apiService.getProfile(customerId),
    staleTime: 60_000 * 2,
    gcTime: 60_000 * 5,
    retry: 2,
  });
};
