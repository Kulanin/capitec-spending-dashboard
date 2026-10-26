import type { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  icon: ReactNode;
  badge?: ReactNode;
  valueClassName?: string;
}

export const MetricCard = ({
  title,
  value,
  subtext,
  icon,
  badge,
  valueClassName = "text-2xl",
}: MetricCardProps) => {
  return (
    <dl className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between h-full min-w-0 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <dt className="text-sm font-medium text-gray-500 truncate mt-1">
          {title}
        </dt>
        <div
          className="p-2.5 bg-blue-50 text-blue-600 rounded-lg shrink-0"
          aria-hidden="true"
        >
          {icon}
        </div>
      </div>

      <dd className="mt-4 flex flex-col min-w-0">
        <div className="flex items-center gap-2 min-w-0">
          <div className="relative group max-w-full min-w-0">
            <span
              className={`font-bold text-gray-900 tracking-tight truncate block cursor-help ${valueClassName}`}
              tabIndex={0}
              aria-label={`Value is ${value}`}
            >
              {value}
            </span>

            <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block group-focus:block z-10 w-max max-w-[200px] px-2.5 py-1.5 text-xs font-medium text-white bg-gray-900 rounded shadow-sm pointer-events-none break-words">
              {value}

              <svg
                className="absolute text-gray-900 h-2 w-full left-0 top-full"
                x="0px"
                y="0px"
                viewBox="0 0 255 255"
              >
                <polygon
                  className="fill-current"
                  points="0,0 127.5,127.5 255,0"
                />
              </svg>
            </div>
          </div>

          {badge && (
            <div className="shrink-0 whitespace-nowrap" aria-hidden="true">
              {badge}
            </div>
          )}
        </div>

        {subtext && (
          <span className="text-xs font-medium text-gray-400 mt-1 truncate">
            {subtext}
          </span>
        )}
      </dd>
    </dl>
  );
};
