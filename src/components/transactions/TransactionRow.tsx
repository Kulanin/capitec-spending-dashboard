import React from "react";
import { renderCategoryIcon } from "../../utils/iconMapper";
import { formatDate, formatZAR } from "../../utils/formatters";
import type { Transaction } from "../../types/api";

export const TransactionRow = React.memo(({ t }: { t: Transaction }) => {
  return (
    <tr className="hover:bg-slate-50/80 transition-colors">
      <td className="py-2.5 px-5">
        <div className="font-semibold text-gray-900 leading-tight">
          {t.merchant}
        </div>
        <div className="text-[11px] text-gray-400 mt-0.5">{t.description}</div>
      </td>
      <td className="py-2.5 px-4">
        <span
          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold"
          style={{
            backgroundColor: `${t.categoryColor}15`,
            color: t.categoryColor,
          }}
        >
          {renderCategoryIcon(t.icon, "w-3 h-3")}
          {t.category}
        </span>
      </td>
      <td className="py-2.5 px-4 text-gray-700 text-xs font-medium">
        {t.paymentMethod}
      </td>
      <td className="py-2.5 px-4 text-gray-500 text-xs whitespace-nowrap">
        {formatDate(t.date)}
      </td>
      <td className="py-2.5 px-5 text-right font-bold text-gray-900 whitespace-nowrap text-sm tabular-nums">
        -{formatZAR(t.amount)}
      </td>
    </tr>
  );
});
