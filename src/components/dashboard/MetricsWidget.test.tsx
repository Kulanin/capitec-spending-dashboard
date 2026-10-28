import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setupServer } from "msw/node";

import { MetricsWidget } from "./MetricsWidget";
import { handlers } from "../../mocks/handles";

const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledFrame: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
};

describe("MetricsWidget", () => {
  it("loads and displays the KPI data from the mocked API", async () => {
    renderWithProviders(<MetricsWidget customerId="12345" period="30d" />);

    expect(screen.getByTestId("metrics-skeleton")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Total Account Spend")).toBeInTheDocument();
    });

    expect(screen.getByLabelText("Value is R15 420.50")).toBeInTheDocument();
  });
});
