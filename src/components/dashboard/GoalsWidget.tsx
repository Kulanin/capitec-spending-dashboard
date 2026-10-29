import { useFetchGoals } from "../../hooks/useFetchGoals";
import { GoalsError } from "./goals/GoalsError";
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
  if (isError || !goals) return <GoalsError onRetry={refetch} />;

  return <SpendingGoals goals={goals.goals} />;
};
