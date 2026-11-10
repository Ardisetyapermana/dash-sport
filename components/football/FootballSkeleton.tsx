import { LoadingSkeleton } from "@/components/LoadingSkeleton";

export function FootballSkeleton() {
  return (
    <div className="space-y-6">
      {/* Skeleton Header info */}
      <div className="flex items-center justify-between">
        <LoadingSkeleton className="h-4 w-48" />
        <LoadingSkeleton className="h-4 w-32" />
      </div>

      {/* Skeleton Table */}
      <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
        <div className="space-y-4">
          <LoadingSkeleton className="h-6 w-full" />
          <LoadingSkeleton className="h-10 w-full" />
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
