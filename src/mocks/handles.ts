import { http, HttpResponse, delay } from "msw";
import {
  mockFilters,
  mockGoals,
  mockProfile,
  mockTransactions,
} from "../api/mockData";
import {
  type CustomerProfile,
  type CategorySpendingResponse,
  type FilterPresetsResponse,
  type GoalsResponse,
  type SortOption,
  type SpendingSummary,
  type SpendingTrendsResponse,
  type TransactionsResponse,
  type PeriodOption,
} from "../types/api";
import { API_BASE_URL } from "../api/baseUrl";

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;
const getLocalDateString = (d: Date) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const calculateStats = (
  transactions: any[],
  startDate: string,
  endDate: string,
) => {
  const filtered = transactions.filter((t) => {
    const txDate = t.date.split("T")[0];
    return txDate >= startDate && txDate <= endDate;
  });

  let totalSpent = 0;
  const categoryTotals: Record<string, number> = {};

  filtered.forEach((t) => {
    totalSpent += t.amount;
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
  });

  const transactionCount = filtered.length;
  const averageTransaction =
    transactionCount > 0 ? totalSpent / transactionCount : 0;

  let topCategory = "None";
  let maxAmount = 0;
  Object.entries(categoryTotals).forEach(([cat, amt]) => {
    if (amt > maxAmount) {
      maxAmount = amt;
      topCategory = cat;
    }
  });

  return { totalSpent, transactionCount, averageTransaction, topCategory };
};
export const handlers = [
  http.get(
    `${API_BASE_URL}/api/customers/:customerId/spending/summary`,
    async ({ request }) => {
      await delay(300);

      const url = new URL(request.url);
      const period = url.searchParams.get("period") || "30d";

      const now = new Date();
      const currentStart = new Date();
      const previousEnd = new Date();
      const previousStart = new Date();

      let days = 30;
      switch (period) {
        case "7d":
          days = 7;
          break;
        case "30d":
          days = 30;
          break;
        case "90d":
          days = 90;
          break;
        case "1y":
          days = 365;
          break;
      }

      currentStart.setDate(now.getDate() - days);

      previousEnd.setDate(currentStart.getDate() - 1);
      previousStart.setDate(previousEnd.getDate() - days);

      const format = (d: Date) => d.toISOString().split("T")[0];

      const currentStats = calculateStats(
        mockTransactions.transactions,
        format(currentStart),
        format(now),
      );

      const previousStats = calculateStats(
        mockTransactions.transactions,
        format(previousStart),
        format(previousEnd),
      );

      const calcChange = (current: number, prev: number) => {
        if (prev === 0) return current > 0 ? 100 : 0;
        return Number((((current - prev) / prev) * 100).toFixed(1));
      };

      const spentChange = calcChange(
        currentStats.totalSpent,
        previousStats.totalSpent,
      );
      const transactionChange = calcChange(
        currentStats.transactionCount,
        previousStats.transactionCount,
      );

      const response: SpendingSummary = {
        period: period as PeriodOption,
        totalSpent: Number(currentStats.totalSpent.toFixed(2)),
        transactionCount: currentStats.transactionCount,
        averageTransaction: Number(currentStats.averageTransaction.toFixed(2)),
        topCategory: currentStats.topCategory,
        comparedToPrevious: {
          spentChange,
          transactionChange,
        },
      };

      return HttpResponse.json(response);
    },
  ),
  http.get(
    `${API_BASE_URL}/api/customers/:customerId/transactions`,
    async ({ request }) => {
      await delay(300);

      const url = new URL(request.url);
      const q = url.searchParams;

      const limit = Math.min(
        MAX_LIMIT,
        Math.max(1, Number(q.get("limit") ?? DEFAULT_LIMIT) || DEFAULT_LIMIT),
      );
      const offset = Math.max(0, Number(q.get("offset") ?? 0) || 0);
      const category = q.get("category") ?? undefined;
      const startDate = q.get("startDate") ?? undefined;
      const endDate = q.get("endDate") ?? undefined;
      const sortBy = (q.get("sortBy") ?? "date_desc") as SortOption;

      let result = [...mockTransactions.transactions];

      if (category && category !== "All") {
        result = result.filter(
          (t) => t.category.toLowerCase() === category.toLowerCase(),
        );
      }

      if (startDate) {
        const from = new Date(startDate).getTime();
        result = result.filter((t) => new Date(t.date).getTime() >= from);
      }
      if (endDate) {
        const to = new Date(endDate);
        to.setHours(23, 59, 59, 999);
        result = result.filter(
          (t) => new Date(t.date).getTime() <= to.getTime(),
        );
      }

      const sorters: Record<
        SortOption,
        (a: (typeof result)[number], b: (typeof result)[number]) => number
      > = {
        date_desc: (a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime(),
        date_asc: (a, b) =>
          new Date(a.date).getTime() - new Date(b.date).getTime(),
        amount_desc: (a, b) => b.amount - a.amount,
        amount_asc: (a, b) => a.amount - b.amount,
      };
      result.sort(sorters[sortBy] ?? sorters.date_desc);

      const total = result.length;
      const page = result.slice(offset, offset + limit);

      return HttpResponse.json<TransactionsResponse>({
        transactions: page,
        pagination: {
          total,
          limit,
          offset,
          hasMore: offset + limit < total,
        },
      });
    },
  ),
  http.get(
    `${API_BASE_URL}/api/customers/:customerId/spending/categories`,
    async ({ request }) => {
      await delay(300);

      const url = new URL(request.url);
      const q = url.searchParams;

      const period = q.get("period") || "30d";
      const startDate = q.get("startDate");
      const endDate = q.get("endDate");

      let result = [...mockTransactions.transactions];

      let finalStartDate = new Date();
      let finalEndDate = new Date();

      if (startDate && endDate) {
        finalStartDate = new Date(startDate);
        finalEndDate = new Date(endDate);
      } else {
        finalEndDate = new Date();
        finalStartDate = new Date();

        switch (period) {
          case "7d":
            finalStartDate.setDate(finalStartDate.getDate() - 7);
            break;
          case "30d":
            finalStartDate.setDate(finalStartDate.getDate() - 30);
            break;
          case "90d":
            finalStartDate.setDate(finalStartDate.getDate() - 90);
            break;
          case "1y":
            finalStartDate.setFullYear(finalStartDate.getFullYear() - 1);
            break;
        }
      }

      const filterStartStr = getLocalDateString(finalStartDate);
      const filterEndStr = getLocalDateString(finalEndDate);

      result = result.filter((t) => {
        const txDateStr = t.date.split("T")[0];
        return txDateStr >= filterStartStr && txDateStr <= filterEndStr;
      });

      // Group by Category
      const categoryMap = new Map<
        string,
        {
          amount: number;
          transactionCount: number;
          color: string;
          icon: string;
        }
      >();
      let totalAmount = 0;

      result.forEach((txn) => {
        const existing = categoryMap.get(txn.category) || {
          amount: 0,
          transactionCount: 0,
          color: txn.categoryColor,
          icon: txn.icon,
        };

        existing.amount += txn.amount;
        existing.transactionCount += 1;
        categoryMap.set(txn.category, existing);

        totalAmount += txn.amount;
      });

      const categories = Array.from(categoryMap.entries()).map(
        ([name, data]) => ({
          name,
          amount: Number(data.amount.toFixed(2)),
          transactionCount: data.transactionCount,
          color: data.color,
          icon: data.icon,
          percentage:
            totalAmount > 0
              ? Number(((data.amount / totalAmount) * 100).toFixed(1))
              : 0,
        }),
      );

      categories.sort((a, b) => b.amount - a.amount);

      return HttpResponse.json<CategorySpendingResponse>({
        dateRange: {
          startDate: filterStartStr,
          endDate: filterEndStr,
        },
        totalAmount: Number(totalAmount.toFixed(2)),
        categories,
      });
    },
  ),

  http.get(
    `${API_BASE_URL}/api/customers/:customerId/spending/trends`,
    async ({ request }) => {
      await delay(300);

      const url = new URL(request.url);

      const rawMonths = Number(url.searchParams.get("months"));
      const monthsParam = Math.min(
        24,
        Math.max(
          1,
          Number.isNaN(rawMonths) || rawMonths === 0 ? 12 : rawMonths,
        ),
      );

      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() - monthsParam + 1);
      startDate.setDate(1);
      startDate.setHours(0, 0, 0, 0);

      const filterStartStr = getLocalDateString(startDate);

      const result = mockTransactions.transactions.filter((t) => {
        const txDateStr = t.date.split("T")[0];
        return txDateStr >= filterStartStr;
      });

      const trendMap = new Map<
        string,
        { totalSpent: number; transactionCount: number }
      >();

      result.forEach((txn) => {
        const month = txn.date.slice(0, 7);

        const existing = trendMap.get(month) || {
          totalSpent: 0,
          transactionCount: 0,
        };
        existing.totalSpent += txn.amount;
        existing.transactionCount += 1;

        trendMap.set(month, existing);
      });

      const trends = Array.from(trendMap.entries())
        .map(([month, data]) => ({
          month,
          totalSpent: Number(data.totalSpent.toFixed(2)),
          transactionCount: data.transactionCount,
          averageTransaction: Number(
            (data.totalSpent / data.transactionCount).toFixed(2),
          ),
        }))
        .sort((a, b) => a.month.localeCompare(b.month));

      return HttpResponse.json<SpendingTrendsResponse>({ trends });
    },
  ),

  http.get(`${API_BASE_URL}/api/customers/:customerId/profile`, async () => {
    await delay(300);
    const lifetimeSpent = mockTransactions.transactions.reduce(
      (sum, txn) => sum + txn.amount,
      0,
    );

    return HttpResponse.json<CustomerProfile>({
      ...mockProfile,
      totalSpent: Number(lifetimeSpent.toFixed(2)),
    });
  }),

  http.get(`${API_BASE_URL}/api/customers/:customerId/goals`, async () => {
    await delay(300);
    return HttpResponse.json<GoalsResponse>(mockGoals);
  }),

  http.get(`${API_BASE_URL}/api/customers/:customerId/filters`, async () => {
    await delay(300);
    return HttpResponse.json<FilterPresetsResponse>(mockFilters);
  }),
];
