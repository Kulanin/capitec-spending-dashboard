import { useFetchGoals } from "../../hooks/useFetchGoals";
import { WidgetError } from "../ui/WidgetError";
import { GoalsSkeleton } from "./goals/GoalsSkeleton";
import { SpendingGoals } from "./goals/SpendingGoalsProgress";

export const GoalsWidget = ({ customerId }: { customerId: string }) => {
  const {
    data: goals,
    isLoading,
    isError,
    refetch,
  } = useFetchGoals(customerId);

  if (isLoading) return <GoalsSkeleton />;
  if (isError || !goals)
    return (
      <WidgetError
        title="Failed to load spending goals."
        onRetry={refetch}
        minHeight="min-h-[150px]"
      />
    );

  return <SpendingGoals goals={goals.goals} />;
};
