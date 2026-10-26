interface GoalsErrorProps {
  onRetry: () => void;
}

export const GoalsError = ({ onRetry }: GoalsErrorProps) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-red-100 shadow-sm w-full flex flex-col items-center justify-center min-h-[150px]">
      <p className="text-sm font-medium text-red-600 mb-3">
        Failed to load spending goals.
      </p>
      <button
        onClick={onRetry}
        className="px-4 py-1.5 bg-red-50 text-red-700 text-xs font-semibold rounded-lg hover:bg-red-100 transition-colors"
      >
        Retry
      </button>
    </div>
  );
};
