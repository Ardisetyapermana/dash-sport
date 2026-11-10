import { Suspense } from "react";
import { BasketballTabNav } from "@/components/basketball/BasketballTabNav";
import { BasketballStandingsView } from "@/components/basketball/BasketballStandingsView";
import { BasketballGamesView } from "@/components/basketball/BasketballGamesView";
import { BasketballSkeleton } from "@/components/basketball/BasketballSkeleton";

interface BasketPageProps {
  searchParams: Promise<{
    tab?: string;
    date?: string;
  }>;
}

export default async function BasketPage({ searchParams }: BasketPageProps) {
  const resolvedParams = await searchParams;
  const currentTab = resolvedParams.tab || "klasemen";
  const selectedDate = resolvedParams.date;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1 border-b border-zinc-200 pb-5 dark:border-zinc-800">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
          Bola Basket
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Pantau klasemen konferensi NBA, jadwal pertandingan mendatang, dan skor akhir terkini.
        </p>
      </div>

      {/* Tab Navigation */}
      <BasketballTabNav currentTab={currentTab} />

      {/* Tab Content with Suspense */}
      <div className="pt-2">
        <Suspense
          key={`${currentTab}-${selectedDate || ""}`}
          fallback={<BasketballSkeleton />}
        >
          {currentTab === "jadwal" ? (
            <BasketballGamesView selectedDate={selectedDate} />
          ) : (
            <BasketballStandingsView />
          )}
        </Suspense>
      </div>

      {/* Data Source Disclaimer */}
      <div className="border-t border-zinc-200 pt-4 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        <p>Data dari API Ninjas. Skor akhir, tanpa update live.</p>
      </div>
    </div>
  );
}
