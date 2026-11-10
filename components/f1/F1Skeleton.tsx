import { LoadingSkeleton } from "@/components/LoadingSkeleton";

export function F1Skeleton() {
  return (
    <div className="space-y-4">
      {/* Skeleton Header info */}
      <div className="flex items-center justify-between">
        <LoadingSkeleton className="h-4 w-40" />
        <LoadingSkeleton className="h-4 w-28" />
      </div>

      {/* Skeleton Table */}
      <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
        <div className="space-y-3.5">
          <LoadingSkeleton className="h-6 w-full" />
          <LoadingSkeleton className="h-10 w-full" />
          <LoadingSkeleton className="h-10 w-full" />
          <LoadingSkeleton className="h-10 w-full" />
          <LoadingSkeleton className="h-10 w-full" />
          <LoadingSkeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
}
