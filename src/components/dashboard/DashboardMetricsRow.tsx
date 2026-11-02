import { ArrowLeftRight, TrendingUp, Wallet, Tag } from "lucide-react";
import type { CustomerProfile, SpendingSummary } from "../../types/api";
import { formatZAR } from "../../utils/formatters";
import { MetricCard } from "../ui/MetricCard";

interface DashboardMetricsRowProps {
  profile: CustomerProfile;
  summary: SpendingSummary;
}

export const DashboardMetricsRow = ({
  profile,
  summary,
}: DashboardMetricsRowProps) => {
  const spentChange = summary.comparedToPrevious.spentChange;
  const transactionChange = summary.comparedToPrevious.transactionChange;
  const isSpendUp = spentChange > 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      <MetricCard
        title="Total Account Spend"
        value={formatZAR(profile.totalSpent)}
        subtext={`${profile.accountType} Account - ${profile.currency}`}
        icon={<Wallet className="w-5 h-5" />}
      />

      <MetricCard
        title="Period Total Spend"
        value={formatZAR(summary.totalSpent)}
        subtext="Vs previous period"
        icon={<TrendingUp className="w-5 h-5" />}
        badge={
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
              isSpendUp
                ? "bg-red-50 text-red-700 border-red-200"
                : "bg-green-50 text-green-700  border-green-200"
            }`}
          >
            {isSpendUp ? "↑ +" : "↓ "}
            {Math.abs(spentChange)}%
          </span>
        }
      />

      <MetricCard
        title="Transactions"
        value={summary.transactionCount}
        subtext="Within selected period"
        icon={<ArrowLeftRight className="w-5 h-5" />}
        badge={
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-50 text-gray-600 border border-gray-200 ${
              transactionChange > 0
                ? "bg-red-50 text-red-700 border-red-200"
                : "bg-green-50 text-green-700 border-green-200"
            }`}
          >
            {transactionChange > 0 ? "↑ +" : "↓ "}
            {Math.abs(transactionChange)}%
          </span>
        }
      />

      <MetricCard
        title="Top Category"
        value={summary.topCategory}
        subtext={`Avg. basket: ${formatZAR(summary.averageTransaction)}`}
        icon={<Tag className="w-5 h-5" />}
        badge={
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            #1 Spent
          </span>
        }
      />
    </div>
  );
};
