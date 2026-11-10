import { BasketballSkeleton } from "@/components/basketball/BasketballSkeleton";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="space-y-2 border-b border-zinc-200 pb-5 dark:border-zinc-800">
        <LoadingSkeleton className="h-8 w-48" />
        <LoadingSkeleton className="h-4 w-96" />
      </div>

      {/* Tab Nav Skeleton */}
      <div className="flex gap-6 border-b border-zinc-200 pb-3 dark:border-zinc-800">
        <LoadingSkeleton className="h-6 w-24" />
        <LoadingSkeleton className="h-6 w-32" />
      </div>

      {/* Content Skeleton */}
      <BasketballSkeleton />
    </div>
  );
}
