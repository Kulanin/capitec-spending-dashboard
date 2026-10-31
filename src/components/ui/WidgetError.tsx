import { AlertCircle } from "lucide-react";

interface WidgetErrorProps {
  title?: string;
  onRetry?: () => void;
  minHeight?: string;
}

export const WidgetError = ({
  title = "Failed to load data.",
  onRetry,
  minHeight,
}: WidgetErrorProps) => {
  const isLargeWidget = Boolean(minHeight);

  return (
    <div
      className={`bg-white rounded-xl border border-red-200 shadow-sm p-6 flex items-center justify-center gap-3 ${
        isLargeWidget ? "flex-col text-center h-full" : "flex-row px-4 py-2"
      } ${minHeight || ""}`}
    >
      <AlertCircle
        className={`text-red-400 shrink-0 ${
          isLargeWidget ? "w-8 h-8 mb-2" : "w-4 h-4"
        }`}
      />

      <div className="flex flex-col items-center">
        <p
          className={`font-medium text-gray-700 ${
            isLargeWidget ? "text-sm mb-1" : "text-xs whitespace-nowrap"
          }`}
        >
          {title}
        </p>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className={`cursor-pointer bg-red-50 text-red-600 font-semibold rounded-lg hover:bg-red-100 transition-colors shrink-0 ${
            isLargeWidget
              ? "px-4 py-2 text-sm mt-2"
              : "px-3 py-1 text-xs rounded-md"
          }`}
        >
          Try Again
        </button>
      )}
    </div>
  );
};
