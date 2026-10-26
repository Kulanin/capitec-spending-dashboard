import { useFetchGoals } from "../../hooks/useFetchGoals";
import { GoalsError } from "../GoalsError";
import { GoalsSkeleton } from "../GoalsSkeleton";
import { SpendingGoals } from "../SpendingGoalsProgress";

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
