export const GoalsSkeleton = () => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 animate-pulse w-full">
      <div className="flex justify-between items-center mb-6">
        <div className="h-6 w-32 bg-gray-200 rounded"></div>
        <div className="h-4 w-24 bg-gray-100 rounded"></div>
      </div>

      {[1, 2].map((i) => (
        <div key={i} className="mb-4">
          <div className="flex justify-between mb-2">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </div>
          <div className="h-3 w-full bg-gray-100 rounded-full"></div>
        </div>
      ))}
    </div>
  );
};
