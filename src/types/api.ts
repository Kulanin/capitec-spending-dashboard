export interface CustomerProfile {
  customerId: string;
  name: string;
  email: string;
  joinDate: string;
  accountType: 'standard' | 'premium' | 'vip';
  totalSpent: number;
  currency: string;
}


export type PeriodOption = '7d' | '30d' | '90d' | '1y';

export interface SpendingSummary {
  period: PeriodOption;
  totalSpent: number;
  transactionCount: number;
  averageTransaction: number;
  topCategory: string;
  comparedToPrevious: {
    spentChange: number;        
    transactionChange: number;
  };
}

export type SortOption = 'date_desc' | 'date_asc' | 'amount_desc' | 'amount_asc';

export interface Transaction {
  id: string;
  date: string;               
  merchant: string;
  category: string;
  amount: number;
  description: string;
  paymentMethod: string;
  icon: string;
  categoryColor: string;
}

export interface TransactionsResponse {
  transactions: Transaction[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

export interface CategoryFilterItem {
  name: string;
  color: string;
  icon: string;
}

export interface FilterPresetsResponse {
  categories: CategoryFilterItem[];
  dateRangePresets: {
    label: string;
    value: PeriodOption;
  }[];
}
export interface MonthlyTrend {
  month: string;               
  totalSpent: number;
  transactionCount: number;
  averageTransaction: number;
}

export interface SpendingTrendsResponse {
  trends: MonthlyTrend[];
}


export interface CategorySpending {
  name: string;
  amount: number;
  percentage: number;
  transactionCount: number;
  color: string;
  icon: string;
}

export interface SpendingCategoriesParams{
  startDate?: string;
  endDate?: string;
  period: PeriodOption;
}



export interface CategorySpendingResponse {
  dateRange: {
    startDate: string;
    endDate: string;
  };
  totalAmount: number;
  categories: CategorySpending[];
}

export type GoalStatus = 'on_track' | 'warning' | 'exceeded';

export interface SpendingGoal {
  id: string;
  category: string;
  monthlyBudget: number;
  currentSpent: number;
  percentageUsed: number;
  daysRemaining: number;
  status: GoalStatus;
}

export interface GoalsResponse {
  goals: SpendingGoal[];
}

export interface ApiErrorBody {
  message?: string;
  code?: string;
  errors?: Record<string, string[]>;
  [key: string]: unknown;
}

export interface GetTransactionsParams {
  category?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: SortOption;
  offset?: number;
  limit?: number;
}