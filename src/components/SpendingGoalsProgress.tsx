import React from "react";
import { Info } from "lucide-react";
import { formatZAR } from "../utils/formatters";
import type { SpendingGoal } from "../types/api";

interface SpendingGoalsProps {
  goals: SpendingGoal[];
}

const categoryColors: Record<string, string> = {
  Entertainment: "#007A87",
  Groceries: "#E0A100",
  Transportation: "#0284C7",
  Dining: "#F59E0B",
};

export const SpendingGoals: React.FC<SpendingGoalsProps> = ({
  goals,
}: SpendingGoalsProps) => {
  const cycleDaysRemaining = goals.length > 0 ? goals[0].daysRemaining : 12;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex flex-col justify-between w-full min-w-0">
        <div className="flex items-center gap-1.5 mb-4">
          <h3 className="text-sm font-bold text-gray-900 whitespace-nowrap">
            Spending Goals
          </h3>
          <Info className="w-3.5 h-3.5 text-gray-400 cursor-pointer hover:text-gray-600 flex-shrink-0" />
        </div>

        <div className="space-y-4">
          {goals.map((goal) => {
            const percentage = (
              goal.percentageUsed ??
              (goal.currentSpent / goal.monthlyBudget) * 100
            ).toFixed(2);
            const barColor = categoryColors[goal.category] || "#007A87";

            return (
              <div
                key={`compact-${goal.id}`}
                className="flex flex-col gap-1.5 w-full"
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-gray-800 truncate">
                    {goal.category}
                  </span>
                  <span className="font-bold text-gray-900 whitespace-nowrap">
                    {percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(Number(percentage), 100)}%`,
                      backgroundColor: barColor,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex flex-col justify-between w-full min-w-0">
        <div className="flex justify-between items-center gap-2 mb-4">
          <h3 className="text-sm font-bold text-gray-900 whitespace-nowrap">
            Spending Goals
          </h3>
          <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
            {cycleDaysRemaining} days remaining
          </span>
        </div>

        <div className="space-y-4">
          {goals.map((goal) => {
            const percentage = (
              goal.percentageUsed ??
              (goal.currentSpent / goal.monthlyBudget) * 100
            ).toFixed(2);
            const barColor = categoryColors[goal.category] || "#007A87";

            const rawStatus = (goal.status || "").toLowerCase();
            const isWarning = rawStatus === "warning";
            const isExceeded = rawStatus === "exceeded";

            const statusLabel =
              rawStatus === "on_track"
                ? "On_track"
                : rawStatus === "warning"
                  ? "Warning"
                  : rawStatus === "exceeded"
                    ? "Exceeded"
                    : goal.status;

            return (
              <div
                key={`detailed-${goal.id}`}
                className="flex flex-col gap-1.5 w-full"
              >
                <div className="flex justify-between items-center text-xs gap-2 min-w-0">
                  <span className="font-semibold text-gray-800 text-[11px] sm:text-xs truncate">
                    {formatZAR(goal.currentSpent)} /{" "}
                    {formatZAR(goal.monthlyBudget)}
                  </span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="font-bold text-gray-900 text-xs">
                      {percentage}%
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold whitespace-nowrap ${
                        isWarning
                          ? "bg-amber-100 text-amber-800"
                          : isExceeded
                            ? "bg-red-100 text-red-800"
                            : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {statusLabel}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(Number(percentage), 100)}%`,
                      backgroundColor: barColor,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
