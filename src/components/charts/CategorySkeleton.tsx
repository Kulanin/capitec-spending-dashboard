export const CategorySkeleton = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex flex-col h-full min-h-[350px] animate-pulse">
      <div className="flex justify-between items-center mb-4">
        <div className="h-5 w-40 bg-gray-200 rounded-md" />
        <div className="h-8 w-24 bg-gray-100 rounded-lg" />
      </div>

      <div className="flex-1 flex items-center justify-center my-2">
        <div className="w-36 h-36 rounded-full border-[12px] border-gray-100" />
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-gray-100">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="flex flex-col bg-gray-50/50 p-2 rounded-md gap-2"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-200" />
              <div className="h-3 w-16 bg-gray-200 rounded" />
            </div>
            <div className="h-4 w-20 bg-gray-200 rounded ml-4" />
          </div>
        ))}
      </div>
    </div>
  );
};
