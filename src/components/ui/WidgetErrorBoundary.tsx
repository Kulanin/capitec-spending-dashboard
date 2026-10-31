import { ErrorBoundary } from "./ErrorBoundary";
import { WidgetError } from "./WidgetError";

interface WidgetErrorBoundaryProps {
  children: React.ReactNode;
  title: string;
  minHeight?: string;
}

export const WidgetErrorBoundary = ({
  children,
  title,
  minHeight,
}: WidgetErrorBoundaryProps) => {
  return (
    <ErrorBoundary
      fallback={(reset) => (
        <WidgetError title={title} onRetry={reset} minHeight={minHeight} />
      )}
    >
      {children}
    </ErrorBoundary>
  );
};
