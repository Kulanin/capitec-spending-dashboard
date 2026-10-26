import type {  GetTransactionsParams } from "../types/api";
import type {
  CategorySpendingResponse,
  FilterPresetsResponse,
  GoalsResponse,
  PeriodOption,
  SpendingCategoriesParams,
  SpendingSummary,
  SpendingTrendsResponse,
  TransactionsResponse,
} from "../types/api";
import { buildQueryString } from "../utils/buildQueryString";
import { http } from "./http";

export const apiService = {
  getProfile: async (customerId: string) => {
    const { data } = await http.get(`/api/customers/${customerId}/profile`);
    return data;
  },

  getSpendingSummary: async (
    customerId: string,
    period: PeriodOption = "30d",
  ): Promise<SpendingSummary> => {
    const query = buildQueryString({ period });

    const { data } = await http.get<SpendingSummary>(
      `/api/customers/${customerId}/spending/summary${query}`,
    );

    return data;
  },

  getTransactions: async (
    customerId: string,
    params: GetTransactionsParams = {},
  ): Promise<TransactionsResponse> => {
    const query = buildQueryString({
      limit: 20,
      offset: 0,
      sortBy: "date_desc",
      ...params,
    });

    const { data } = await http.get<TransactionsResponse>(
      `/api/customers/${customerId}/transactions${query}`,
    );

    return data;
  },

  getFilters: async (customerId: string): Promise<FilterPresetsResponse> => {
    const { data } = await http.get(`/api/customers/${customerId}/filters`);
    return data;
  },

  getTrends: async (
    customerId: string,
    months = 12,
  ): Promise<SpendingTrendsResponse> => {
    const query = buildQueryString({
      months,
    });

    const { data } = await http.get<SpendingTrendsResponse>(
      `/api/customers/${customerId}/spending/trends${query}`,
    );

    return data;
  },

  getCategorySpending: async (
    customerId: string,
    params: SpendingCategoriesParams,
  ): Promise<CategorySpendingResponse> => {
    const query = buildQueryString({
      ...params,
    });

    const { data } = await http.get<CategorySpendingResponse>(
      `/api/customers/${customerId}/spending/categories${query}`,
    );
    return data;
  },

  getGoals: async (customerId: string): Promise<GoalsResponse> => {
    const { data } = await http.get<GoalsResponse>(
      `/api/customers/${customerId}/goals`,
    );

    return data;
  },
};
