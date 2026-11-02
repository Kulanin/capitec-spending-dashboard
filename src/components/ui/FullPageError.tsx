import { AlertTriangle } from "lucide-react";

interface FullPageErrorProps {
  title?: string;
  message?: string;
  onRetry: () => void;
}

export const FullPageError = ({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please refresh the page or try again.",
  onRetry,
}: FullPageErrorProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4 text-center">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 max-w-md w-full">
        <div className="w-12 h-12 bg-red-100 text-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <h2 className="text-lg font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-sm text-gray-500 mb-6">{message}</p>

        <button
          onClick={onRetry}
          className="w-full cursor-pointer px-4 py-2.5 bg-[#00486d] text-white rounded-lg font-semibold hover:bg-[#003a59] transition-colors focus:outline-none focus:ring-2 focus:ring-[#00486d]/50"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};
