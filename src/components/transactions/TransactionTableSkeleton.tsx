export const TransactionTableSkeleton = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden animate-pulse">
      <div className="p-4 sm:p-5 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="h-6 w-48 bg-gray-200 rounded mb-2" />
          <div className="h-3 w-64 bg-gray-100 rounded" />
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="h-8 w-32 bg-gray-100 rounded-lg hidden sm:block" />
          <div className="h-8 w-32 bg-gray-100 rounded-lg hidden sm:block" />
          <div className="h-8 w-32 bg-gray-100 rounded-lg hidden sm:block" />

          <div className="h-8 w-full sm:w-32 bg-gray-100 rounded-lg" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100 h-10">
              <th className="w-1/3"></th>
              <th className="w-1/6"></th>
              <th className="w-1/6"></th>
              <th className="w-1/6"></th>
              <th className="w-1/6"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {Array.from({ length: 10 }).map((_, i) => (
              <tr key={i} className="h-[60px]">
                <td className="py-2.5 px-5">
                  <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
                  <div className="h-3 w-40 bg-gray-100 rounded" />
                </td>

                <td className="py-2.5 px-4">
                  <div className="h-6 w-24 bg-gray-100 rounded-full" />
                </td>

                <td className="py-2.5 px-4">
                  <div className="h-4 w-20 bg-gray-200 rounded" />
                </td>

                <td className="py-2.5 px-4">
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                </td>

                <td className="py-2.5 px-5 text-right">
                  <div className="flex justify-end">
                    <div className="h-4 w-20 bg-gray-200 rounded" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="h-[54px] bg-gray-50/50 border-t border-gray-100 px-5 flex items-center justify-between">
        <div className="h-3 w-32 bg-gray-200 rounded" />
        <div className="flex gap-2">
          <div className="h-8 w-24 bg-white border border-gray-200 rounded-lg" />
          <div className="h-8 w-20 bg-white border border-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
};
