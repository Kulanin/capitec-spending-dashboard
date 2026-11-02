import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children?: ReactNode;
  fallback?: (reset: () => void) => ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error caught by boundary:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback(this.handleReset);
      }

      return (
        <div className="w-full p-6 bg-red-50 rounded-xl border border-red-100 flex flex-col items-center justify-center text-center">
          <p className="text-sm text-red-700 font-medium mb-3">
            Something went wrong loading this section.
          </p>
          <button
            onClick={this.handleReset}
            className="cursor-pointer px-4 py-2 bg-white text-red-700 border border-red-200 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
