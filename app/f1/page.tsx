import { Suspense } from "react";
import { F1TabNav } from "@/components/f1/F1TabNav";
import { DriverStandingsView } from "@/components/f1/DriverStandingsView";
import { ConstructorStandingsView } from "@/components/f1/ConstructorStandingsView";
import { ScheduleView } from "@/components/f1/ScheduleView";
import { LastResultsView } from "@/components/f1/LastResultsView";
import { F1Skeleton } from "@/components/f1/F1Skeleton";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";

interface F1PageProps {
  searchParams: Promise<{
    tab?: string;
  }>;
}

export default async function F1Page({ searchParams }: F1PageProps) {
  const resolvedParams = await searchParams;
  const currentTab = resolvedParams.tab || "pembalap";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1 border-b border-zinc-200 pb-5 dark:border-zinc-800">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
          Formula 1
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Pantau klasemen pembalap, klasemen konstruktor, kalender seri balapan, dan hasil Grand Prix terkini.
        </p>
      </div>

      {/* Tab Navigation */}
      <F1TabNav currentTab={currentTab} />

      {/* Tab Content with Suspense */}
      <div className="pt-2">
        <Suspense key={currentTab} fallback={<F1Skeleton />}>
          {currentTab === "konstruktor" ? (
            <ConstructorStandingsView />
          ) : currentTab === "kalender" ? (
            <Suspense fallback={<LoadingSkeleton className="h-96 w-full rounded-xl" />}>
              <ScheduleView />
            </Suspense>
          ) : currentTab === "hasil" ? (
            <LastResultsView />
          ) : (
            <DriverStandingsView />
          )}
        </Suspense>
      </div>

      {/* Data Source Disclaimer */}
      <div className="border-t border-zinc-200 pt-4 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        <p>Data dari Jolpica-F1, diperbarui setelah balapan selesai.</p>
      </div>
    </div>
  );
}
