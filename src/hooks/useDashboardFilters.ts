import { useSearchParams } from "react-router-dom";
import type { PeriodOption,  } from "../types/api";

export const useDashboardFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const period = (searchParams.get("period") as PeriodOption) || "30d";

  const setPeriod = (newPeriod: string) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("period", newPeriod);
      return params;
    }, { replace: true });
  };

  return { period, setPeriod };
};