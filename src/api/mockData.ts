import type {
  CategorySpendingResponse,
  CustomerProfile,
  FilterPresetsResponse,
  GoalsResponse,
  SpendingSummary,
  SpendingTrendsResponse,
  Transaction,
  TransactionsResponse,
} from "../types/api";

export const mockProfile: CustomerProfile = {
  customerId: "12345",
  name: "John Doe",
  email: "john.doe@email.com",
  joinDate: "2023-01-15",
  accountType: "premium",
  totalSpent: 15420.5,
  currency: "ZAR",
};

export const mockSummary: SpendingSummary = {
  period: "30d",
  totalSpent: 4250.75,
  transactionCount: 47,
  averageTransaction: 90.44,
  topCategory: "Groceries",
  comparedToPrevious: {
    spentChange: 12.5,
    transactionChange: -3.2,
  },
};

export const mockFilters: FilterPresetsResponse = {
  categories: [
    { name: "Groceries", color: "#FF6B6B", icon: "shopping-cart" },
    { name: "Entertainment", color: "#4ECDC4", icon: "film" },
    { name: "Transportation", color: "#45B7D1", icon: "car" },
    { name: "Dining", color: "#F7DC6F", icon: "utensils" },
    { name: "Shopping", color: "#BB8FCE", icon: "shopping-bag" },
    { name: "Utilities", color: "#85C1E9", icon: "zap" },
  ],
  dateRangePresets: [
    { label: "Last 7 days", value: "7d" },
    { label: "Last 30 days", value: "30d" },
    { label: "Last 90 days", value: "90d" },
    { label: "Last year", value: "1y" },
  ],
};

export const mockTrends: SpendingTrendsResponse = {
  trends: [
    {
      month: "2024-01",
      totalSpent: 3890.25,
      transactionCount: 42,
      averageTransaction: 92.62,
    },
    {
      month: "2024-02",
      totalSpent: 4150.8,
      transactionCount: 38,
      averageTransaction: 109.23,
    },
    {
      month: "2024-03",
      totalSpent: 3750.6,
      transactionCount: 45,
      averageTransaction: 83.35,
    },
    {
      month: "2024-04",
      totalSpent: 4200.45,
      transactionCount: 39,
      averageTransaction: 107.7,
    },
    {
      month: "2024-05",
      totalSpent: 3980.3,
      transactionCount: 44,
      averageTransaction: 90.46,
    },
    {
      month: "2024-06",
      totalSpent: 4250.75,
      transactionCount: 47,
      averageTransaction: 90.44,
    },
  ],
};

export const mockCategories: CategorySpendingResponse = {
  dateRange: {
    startDate: "2024-08-16",
    endDate: "2024-09-16",
  },
  totalAmount: 4250.75,
  categories: [
    {
      name: "Groceries",
      amount: 1250.3,
      percentage: 29.4,
      transactionCount: 15,
      color: "#FF6B6B",
      icon: "shopping-cart",
    },
    {
      name: "Entertainment",
      amount: 890.2,
      percentage: 20.9,
      transactionCount: 8,
      color: "#4ECDC4",
      icon: "film",
    },
    {
      name: "Transportation",
      amount: 680.45,
      percentage: 16.0,
      transactionCount: 12,
      color: "#45B7D1",
      icon: "car",
    },
    {
      name: "Dining",
      amount: 520.3,
      percentage: 12.2,
      transactionCount: 9,
      color: "#F7DC6F",
      icon: "utensils",
    },
    {
      name: "Shopping",
      amount: 450.8,
      percentage: 10.6,
      transactionCount: 6,
      color: "#BB8FCE",
      icon: "shopping-bag",
    },
    {
      name: "Utilities",
      amount: 458.7,
      percentage: 10.8,
      transactionCount: 3,
      color: "#85C1E9",
      icon: "zap",
    },
  ],
};

export const mockGoals: GoalsResponse = {
  goals: [
    {
      id: "goal_001",
      category: "Entertainment",
      monthlyBudget: 1000.0,
      currentSpent: 650.3,
      percentageUsed: 65.03,
      daysRemaining: 12,
      status: "on_track",
    },
    {
      id: "goal_002",
      category: "Groceries",
      monthlyBudget: 1500.0,
      currentSpent: 1450.8,
      percentageUsed: 96.72,
      daysRemaining: 12,
      status: "warning",
    },
  ],
};


const categories = [
  { name: 'Groceries', color: '#FF6B6B', icon: 'shopping-cart', merchants: ['Pick n Pay', 'Checkers', 'Woolworths', 'Spar'] },
  { name: 'Entertainment', color: '#4ECDC4', icon: 'film', merchants: ['Netflix', 'Spotify', 'Ster-Kinekor', 'Showmax'] },
  { name: 'Transportation', color: '#45B7D1', icon: 'car', merchants: ['Uber', 'Engen QuickShop', 'Shell', 'Gautrain'] },
  { name: 'Dining', color: '#F7DC6F', icon: 'utensils', merchants: ['Nando\'s', 'McDonald\'s', 'Ocean Basket', 'Kauai'] },
  { name: 'Utilities', color: '#85C1E9', icon: 'zap', merchants: ['Eskom Direct', 'City of Cape Town', 'Vodacom', 'Afrihost'] },
  { name: 'Shopping', color: '#BB8FCE', icon: 'shopping-bag', merchants: ['Takealot', 'Mr Price', 'Sportscene', 'Clicks'] },
];


const getRecentDate = (daysAgo: number) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  // Randomize the time of day so they sort properly
  d.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
  return d.toISOString();
};

// Generate 60 transactions spread over the last 365 days
const generateTransactions = (): Transaction[] => {
  const txs: Transaction[] = [];
  
  for (let i = 0; i < 60; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const merchant = category.merchants[Math.floor(Math.random() * category.merchants.length)];
    
    // Spread dates: mostly recent, some old
    let daysAgo = 0;
    if (i < 15) daysAgo = Math.floor(Math.random() * 7); // 15 in the last 7 days
    else if (i < 35) daysAgo = Math.floor(Math.random() * 30) + 7; // 20 in the last 30 days
    else if (i < 50) daysAgo = Math.floor(Math.random() * 90) + 30; // 15 in the last 90 days
    else daysAgo = Math.floor(Math.random() * 275) + 90; // 10 in the last year

    txs.push({
      id: `txn_${100000 + i}`,
      date: getRecentDate(daysAgo),
      merchant: merchant,
      category: category.name,
      amount: Number((Math.random() * 800 + 50).toFixed(2)),
      description: `${category.name} purchase at ${merchant}`,
      paymentMethod: Math.random() > 0.5 ? 'Credit Card' : 'Debit Order',
      icon: category.icon,
      categoryColor: category.color,
    });
  }

  return txs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const mockTransactions: TransactionsResponse = {
  transactions: generateTransactions(),
  pagination: {
    total: 60,
    limit: 20,
    offset: 0,
    hasMore: true,
  },
};
