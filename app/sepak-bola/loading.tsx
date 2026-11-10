import { FootballSkeleton } from "@/components/football/FootballSkeleton";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="space-y-2 border-b border-zinc-200 pb-6 dark:border-zinc-800">
        <LoadingSkeleton className="h-8 w-48" />
        <LoadingSkeleton className="h-4 w-96" />
      </div>

      {/* League Selector Skeleton */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <LoadingSkeleton className="h-9 w-28 shrink-0 rounded-lg" />
        <LoadingSkeleton className="h-9 w-28 shrink-0 rounded-lg" />
        <LoadingSkeleton className="h-9 w-28 shrink-0 rounded-lg" />
        <LoadingSkeleton className="h-9 w-28 shrink-0 rounded-lg" />
      </div>

      {/* Tab Nav Skeleton */}
      <div className="flex gap-6 border-b border-zinc-200 pb-3 dark:border-zinc-800">
        <LoadingSkeleton className="h-6 w-20" />
        <LoadingSkeleton className="h-6 w-28" />
        <LoadingSkeleton className="h-6 w-24" />
      </div>

      {/* Main Content Skeleton */}
      <FootballSkeleton />
    </div>
  );
}
