export const ChartSkeleton = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex flex-col h-full min-h-[350px] animate-pulse">
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col gap-2">
          <div className="h-5 w-40 bg-gray-200 rounded-md" />
          <div className="h-3 w-56 bg-gray-100 rounded-md" />
        </div>
        <div className="h-8 w-24 bg-gray-100 rounded-lg" />
      </div>

      <div className="flex-1 w-full flex items-end justify-around p-4 gap-4">
        <div className="w-8 max-w-[12%] bg-gray-200 rounded-t-sm h-[40%]" />
        <div className="w-8 max-w-[12%] bg-gray-200 rounded-t-sm h-[70%]" />
        <div className="w-8 max-w-[12%] bg-gray-200 rounded-t-sm h-[50%]" />
        <div className="w-8 max-w-[12%] bg-gray-200 rounded-t-sm h-[90%]" />
      </div>
    </div>
  );
};
