import { Suspense } from "react";
import {
  DEFAULT_COMPETITION,
  getCompetitionByCode,
  isValidCompetitionCode,
} from "@/lib/sports/football/competitions";
import { LeagueSelector } from "@/components/football/LeagueSelector";
import { TabNav } from "@/components/football/TabNav";
import { StandingsView } from "@/components/football/StandingsView";
import { MatchesView } from "@/components/football/MatchesView";
import { TopScorersView } from "@/components/football/TopScorersView";
import { FootballSkeleton } from "@/components/football/FootballSkeleton";

interface SepakBolaPageProps {
  searchParams: Promise<{
    liga?: string;
    tab?: string;
  }>;
}

export default async function SepakBolaPage({
  searchParams,
}: SepakBolaPageProps) {
  const resolvedParams = await searchParams;
  const rawLeague = resolvedParams.liga || DEFAULT_COMPETITION;
  const currentLeague = isValidCompetitionCode(rawLeague)
    ? rawLeague.toUpperCase()
    : DEFAULT_COMPETITION;
  const currentTab = resolvedParams.tab || "klasemen";

  const competitionInfo = getCompetitionByCode(currentLeague);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1 border-b border-zinc-200 pb-5 dark:border-zinc-800">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
              Sepak Bola
            </h1>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Pantau klasemen terbaru, jadwal & hasil pertandingan, serta daftar top skorer {competitionInfo ? competitionInfo.name : "liga dunia"}.
            </p>
          </div>
        </div>
      </div>

      {/* League Selector */}
      <LeagueSelector
        currentLeague={currentLeague}
        currentTab={currentTab}
      />

      {/* Tab Navigation */}
      <TabNav
        currentLeague={currentLeague}
        currentTab={currentTab}
      />

      {/* Tab Content with Suspense */}
      <div className="pt-2">
        <Suspense
          key={`${currentLeague}-${currentTab}`}
          fallback={<FootballSkeleton />}
        >
          {currentTab === "jadwal" ? (
            <MatchesView leagueCode={currentLeague} />
          ) : currentTab === "top-skorer" ? (
            <TopScorersView leagueCode={currentLeague} />
          ) : (
            <StandingsView leagueCode={currentLeague} />
          )}
        </Suspense>
      </div>

      {/* Data Source Disclaimer */}
      <div className="border-t border-zinc-200 pt-4 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        <p>Data dari football-data.org, skor dapat tertunda.</p>
      </div>
    </div>
  );
}
