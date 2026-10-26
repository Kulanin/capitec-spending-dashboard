import { useDashboardFilters } from "../../hooks/useDashboardFilters";
import { useFetchCustomerProfile } from "../../hooks/useFetchCustomerProfile";
import { getDateRangeFromPeriod } from "../../utils/dateHelpers";
import { GoalsWidget } from "../dashboard/GoalsWidget";
import { MetricsWidget } from "../dashboard/MetricsWidget";
import { TrendsWidget } from "../dashboard/TrendsWidget";
import { DateRangeFilterContainer } from "../DateRangeFilterContainer";
import { DashboardLayout } from "../layout/DashboardLayout";
import { CategoryChartWidget } from "../transactions/CategoryChartWidget";
import { TransactionsWidget } from "../transactions/TransactionsWidget";
import { DashboardSkeleton } from "../ui/DashboardSkeleton";
import { FullPageError } from "../ui/FullPageError";
import { UserProfileWidget } from "../UserProfileWidget";

export const DashboardPage = () => {
  const customerId = "12345";
  const {
    data: profile,
    isLoading,
    isError,
    refetch,
  } = useFetchCustomerProfile(customerId);
  const { period } = useDashboardFilters();
  const { startDate, endDate } = getDateRangeFromPeriod(period);

  if (isLoading) return <DashboardSkeleton />;
  if (isError || !profile) return <FullPageError onRetry={refetch} />;

  return (
    <DashboardLayout profile={profile}>
      {/* HEADER */}
      <header className="flex flex-row items-center justify-between w-full border-b border-gray-100 pb-5">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          <div className="flex flex-col text-left">
            <h4 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
              Welcome, {profile.name}
            </h4>
            <p className="text-xs font-medium text-gray-500 mt-0.5">
              Premium Account Overview
            </p>
          </div>
          <DateRangeFilterContainer customerId={customerId} />
        </div>
        <div className="hidden md:block">
          <UserProfileWidget profile={profile} />
        </div>
      </header>

      <section className="flex flex-col gap-6 w-full">
        <MetricsWidget period={period} customerId={customerId} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
          <div className="lg:col-span-2">
            <TrendsWidget customerId={customerId} period={period} />
          </div>
          <div>
            <CategoryChartWidget period={period} customerId={customerId} />
          </div>
          <div className="col-span-full w-full my-4">
            <GoalsWidget customerId={customerId} />
          </div>
        </div>
        <TransactionsWidget
          customerId={customerId}
          defaultStartDate={startDate}
          defaultEndDate={endDate}
        />
      </section>
    </DashboardLayout>
  );
};
