import type {  GetTransactionsParams } from "../types/api";
import type { PeriodOption, SpendingCategoriesParams } from "../types/api";

export const customerKeys = {
  all: ['customer'] as const,

  profile: (id: string) =>
    [...customerKeys.all, id, 'profile'] as const,

  summary: (id: string, period: PeriodOption) =>
    [...customerKeys.all, id, 'summary', period] as const,

  transactions: (id: string, p: GetTransactionsParams) =>
    [
      ...customerKeys.all,
      id,
      'transactions',
      {
        limit: p.limit ?? 20,
        offset: p.offset ?? 0,
        category: p.category ?? null,
        startDate: p.startDate ?? null,
        endDate: p.endDate ?? null,
        sortBy: p.sortBy ?? 'date_desc',
      },
    ] as const,

  filters: (id: string) =>
    [...customerKeys.all, id, 'filters'] as const,

  trends: (id: string, months: number) =>
    [...customerKeys.all, id, 'trends', months] as const,

  spendingCategories: (
    id: string,
    p: SpendingCategoriesParams,
  ) =>
    [
      ...customerKeys.all,
      id,
      'spendingCategories',
      {
        period: p?.period,
        startDate: p?.startDate ?? null,
        endDate: p?.endDate ?? null,
      },
    ] as const,

  goals: (id: string) =>
    [...customerKeys.all, id, 'goals'] as const,
};
