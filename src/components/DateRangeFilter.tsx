import React from "react";
import { Calendar } from "lucide-react";

interface DateFilterProps {
  presets: Array<{ label: string; value: string }>;
  selectedPeriod: string;
  onSelectPeriod: (value: string) => void;
}

export const DateRangeFilter: React.FC<DateFilterProps> = ({
  presets,
  selectedPeriod,
  onSelectPeriod,
}) => {
  if (!presets || presets.length === 0) {
    return null;
  }

  return (
    <div className="relative inline-flex items-center">
      <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1">
        <Calendar className="w-4 h-4 ml-2 text-gray-400" />
        <select
          value={selectedPeriod}
          onChange={(e) => onSelectPeriod(e.target.value)}
          className="bg-transparent border-none text-sm font-medium text-gray-700 pl-2 pr-8 py-1 focus:outline-none cursor-pointer"
        >
          {presets.map((preset) => (
            <option key={preset.value} value={preset.value}>
              {preset.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
