import React, { useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from "recharts";
import type { CategorySpending } from "../../types/api";
import {
  formatPercentLabel,
  formatTooltipZAR,
  formatZAR,
} from "../../utils/formatters";

interface CategoryPieChartProps {
  categories: CategorySpending[];
}

type ChartView = "donut" | "pie" | "bar";

export const CategoryPieChart: React.FC<CategoryPieChartProps> = ({
  categories,
}) => {
  const [chartView, setChartView] = useState<ChartView>("donut");

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.05) return null;

    return (
      <text
        x={x}
        y={y}
        fill="#ffffff"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-[10px] font-bold drop-shadow"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div
      style={{ outline: "none" }}
      className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex flex-col justify-between h-full"
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <h3 className="text-sm font-bold text-gray-900 truncate">
          Spending by Category
        </h3>

        <select
          value={chartView}
          onChange={(e) => setChartView(e.target.value as ChartView)}
          aria-label="Category chart type"
          className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer flex-shrink-0"
        >
          <option value="donut">Donut Chart</option>
          <option value="pie">Pie Chart</option>
          <option value="bar">Bar Chart</option>
        </select>
      </div>

      <div className="h-36 w-full my-1 flex-shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          {chartView === "donut" || chartView === "pie" ? (
            <PieChart>
              <Pie
                data={categories}
                dataKey="amount"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={chartView === "donut" ? 35 : 0}
                outerRadius={60}
                paddingAngle={chartView === "donut" ? 3 : 1}
                label={renderCustomizedLabel}
                labelLine={false}
              >
                {categories.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="#ffffff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={formatTooltipZAR("Amount")}
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          ) : (
            <BarChart
              data={categories}
              layout="vertical"
              margin={{ top: 0, right: 30, left: 10, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                stroke="#f3f4f6"
              />
              <XAxis
                type="number"
                stroke="#9ca3af"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                dataKey="name"
                type="category"
                stroke="#4b5563"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                width={80}
                interval={0}
              />
              <Tooltip
                formatter={formatTooltipZAR("Amount")}
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="amount" radius={[0, 4, 4, 0]} maxBarSize={12}>
                {categories.map((entry, index) => (
                  <Cell key={`bar-cell-${index}`} fill={entry.color} />
                ))}
                <LabelList
                  dataKey="percentage"
                  position="right"
                  formatter={formatPercentLabel()}
                  style={{ fontSize: "10px", fill: "#4b5563", fontWeight: 600 }}
                />
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-x-2 gap-y-2 mt-3 pt-3 border-t border-gray-100">
        {categories.map((cat) => (
          <CategoryBreakdownItem key={cat.name} category={cat} />
        ))}
      </div>
    </div>
  );
};

interface CategoryBreakdownItemProps {
  category: CategorySpending;
}

const CategoryBreakdownItem = ({ category }: CategoryBreakdownItemProps) => {
  return (
    <div className="flex flex-col bg-gray-50/70 px-2.5 py-2 rounded-md border border-gray-100/50 min-w-0 transition-colors hover:bg-gray-100/80 cursor-default">
      <div className="flex items-center justify-between gap-1.5 min-w-0 mb-1">
        <div className="flex items-center gap-1.5 min-w-0">
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: category.color }}
          />
          <span
            className="font-medium text-gray-600 text-[11px] truncate"
            title={category.name}
          >
            {category.name}
          </span>
        </div>
        <span className="text-[10px] font-semibold text-gray-500 shrink-0">
          {category.percentage}%
        </span>
      </div>
      <span className="font-bold text-gray-900 text-sm pl-3.5 truncate">
        {formatZAR(category.amount)}
      </span>
    </div>
  );
};
