import React from "react";

export interface LoadingSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "block" | "text" | "card" | "circle";
  count?: number;
  className?: string;
}

export function LoadingSkeleton({
  variant = "block",
  count = 1,
  className = "",
  ...props
}: LoadingSkeletonProps) {
  const baseClasses =
    "animate-pulse bg-zinc-200 dark:bg-zinc-800 transition-colors";

  if (variant === "circle") {
    return (
      <div
        className={`rounded-full ${baseClasses} ${className || "h-10 w-10"}`}
        aria-hidden="true"
        {...props}
      />
    );
  }

  if (variant === "text") {
    return (
      <div className="space-y-2.5" aria-hidden="true" {...props}>
        {Array.from({ length: count }).map((_, idx) => (
          <div
            key={idx}
            className={`h-4 rounded ${baseClasses} ${
              idx === count - 1 && count > 1 ? "w-4/5" : "w-full"
            } ${className}`}
          />
        ))}
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div
        className="rounded-xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900"
        aria-hidden="true"
        {...props}
      >
        <div className="mb-4 flex items-center justify-between">
          <div className={`h-5 w-32 rounded ${baseClasses}`} />
          <div className={`h-4 w-12 rounded-full ${baseClasses}`} />
        </div>
        <div className="space-y-2">
          <div className={`h-4 w-full rounded ${baseClasses}`} />
          <div className={`h-4 w-3/4 rounded ${baseClasses}`} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-md ${baseClasses} ${className || "h-6 w-full"}`}
      aria-hidden="true"
      {...props}
    />
  );
}
