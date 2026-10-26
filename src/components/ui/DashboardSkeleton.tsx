// src/components/DashboardSkeleton.tsx

export const DashboardSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-slate-50 text-left animate-pulse">
      <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 p-6 h-screen">
        <div className="h-8 w-32 bg-gray-200 rounded mb-10" />
        <div className="space-y-4">
          <div className="h-10 bg-gray-100 rounded-lg" />
        </div>
      </div>

      <main className="flex-1 min-w-0 flex flex-col p-4 sm:p-6 md:p-8 gap-6 md:gap-8">
        <header className="flex flex-row items-center justify-between w-full border-b border-gray-100 pb-5">
          <div className="flex flex-col gap-2">
            <div className="h-8 w-48 bg-gray-200 rounded" />
            <div className="h-4 w-32 bg-gray-100 rounded" />
          </div>
          <div className="h-10 w-32 bg-gray-200 rounded-lg" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-32 bg-white rounded-xl border border-gray-200 p-4"
            >
              <div className="h-4 w-24 bg-gray-100 rounded mb-4" />
              <div className="h-8 w-32 bg-gray-200 rounded mb-2" />
              <div className="h-3 w-20 bg-gray-100 rounded" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
          <div className="lg:col-span-2 h-80 bg-white rounded-xl border border-gray-200" />
          <div className="h-80 bg-white rounded-xl border border-gray-200" />
        </div>

        <div className="h-96 bg-white rounded-xl border border-gray-200 w-full" />
      </main>
    </div>
  );
};
