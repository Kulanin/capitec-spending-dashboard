import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type {  GetTransactionsParams, TransactionsResponse } from "../types/api";
import { apiService } from "../api/client";
import { customerKeys } from "../utils/queryKeys";



export const useFetchTransactions = (
  customerId: string,
  params: GetTransactionsParams = {},
): UseQueryResult<TransactionsResponse, any> =>(
    useQuery<TransactionsResponse, any>({
    queryKey: customerKeys.transactions(customerId, params),
    queryFn: () => apiService.getTransactions(customerId, params),
    staleTime: 2 * 60_000,
    gcTime: 5 * 60_000,
    retry: 2,
    enabled: Boolean(customerId),
  })

)


