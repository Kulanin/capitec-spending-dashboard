import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  TransactionTable,
  type TransactionTableProps,
} from "./TransactionTable";
import { mockTransactions } from "../../api/mockData";

describe("TransactionTable", () => {
  const defaultProps = {
    transactions: mockTransactions.transactions,
    totalCount: 50,
    hasMore: true,
    filters: {
      category: "All",
      sortBy: "date_desc",
      offset: 0,
      limit: 20,
      startDate: "",
      endDate: "",
    },
    onFilterChange: vi.fn(),
  } as TransactionTableProps;

  it("renders the transactions correctly", () => {
    render(<TransactionTable {...defaultProps} />);

    expect(screen.getByText("Pick n Pay")).toBeInTheDocument();
    expect(screen.getByText("Netflix")).toBeInTheDocument();
    expect(screen.getByText("-R245.80")).toBeInTheDocument();
  });

  it("calls onFilterChange when the category is changed", async () => {
    const user = userEvent.setup();
    render(<TransactionTable {...defaultProps} />);

    const categorySelect = screen.getByRole("combobox", {
      name: /categories/i,
    });
    await user.selectOptions(categorySelect, "Groceries");

    expect(defaultProps.onFilterChange).toHaveBeenCalledWith({
      category: "Groceries",
      offset: 0,
    });
  });

  it("calls onFilterChange when Next page is clicked", async () => {
    const user = userEvent.setup();
    render(<TransactionTable {...defaultProps} />);

    const nextButton = screen.getByRole("button", { name: /next/i });
    await user.click(nextButton);

    expect(defaultProps.onFilterChange).toHaveBeenCalledWith({
      offset: 20,
    });
  });

  it("disables the Previous button on the first page", () => {
    render(<TransactionTable {...defaultProps} />);
    const prevButton = screen.getByRole("button", { name: /previous/i });
    expect(prevButton).toBeDisabled();
  });

  it("renders an empty state when there are no transactions", () => {
    render(<TransactionTable {...defaultProps} transactions={[]} />);
    expect(screen.getByText(/no transactions found/i)).toBeInTheDocument();
  });
});
