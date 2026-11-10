import { getMatches } from "@/lib/sports/football/client";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Match } from "@/lib/sports/football/types";

interface MatchesViewProps {
  leagueCode: string;
}

function formatMatchDate(utcDate: string): string {
  try {
    const date = new Date(utcDate);
    const formatted = new Intl.DateTimeFormat("id-ID", {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Jakarta",
    }).format(date);
    return `${formatted} WIB`;
  } catch {
    return utcDate;
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "FINISHED":
      return (
        <span className="rounded bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
          Selesai
        </span>
      );
    case "IN_PLAY":
    case "PAUSED":
      return (
        <span className="inline-flex items-center gap-1 rounded bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Tanding
        </span>
      );
    case "SCHEDULED":
    case "TIMED":
      return (
        <span className="rounded bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
          Terjadwal
        </span>
      );
    case "POSTPONED":
      return (
        <span className="rounded bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
          Ditunda
        </span>
      );
    case "CANCELLED":
      return (
        <span className="rounded bg-red-50 px-2 py-0.5 text-[11px] font-medium text-red-700 dark:bg-red-950/50 dark:text-red-300">
          Dibatalkan
        </span>
      );
    default:
      return (
        <span className="rounded bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
          {status}
        </span>
      );
  }
}

function MatchCard({ match }: { match: Match }) {
  const isFinished = match.status === "FINISHED";
  const homeScore = match.score.fullTime.home;
  const awayScore = match.score.fullTime.away;

  return (
    <div className="flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-4 shadow-xs transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
      {/* Header Info */}
      <div className="mb-3 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
        <span className="font-medium">
          {match.matchday ? `Pekan ke-${match.matchday}` : match.stage || "Laga"}
        </span>
        <div className="flex items-center gap-2">
          <span>{formatMatchDate(match.utcDate)}</span>
          {getStatusBadge(match.status)}
        </div>
      </div>

      {/* Teams and Score Grid */}
      <div className="space-y-2.5">
        {/* Home Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            {match.homeTeam.crest ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={match.homeTeam.crest}
                alt=""
                className="h-5 w-5 shrink-0 object-contain"
                loading="lazy"
              />
            ) : (
              <div className="h-5 w-5 rounded-full bg-zinc-200 dark:bg-zinc-700" />
            )}
            <span
              className={`truncate text-sm font-medium ${
                isFinished && homeScore !== null && awayScore !== null && homeScore > awayScore
                  ? "font-bold text-zinc-900 dark:text-zinc-50"
                  : "text-zinc-700 dark:text-zinc-300"
              }`}
            >
              {match.homeTeam.shortName || match.homeTeam.name}
            </span>
          </div>
          <span
            className={`ml-3 text-sm font-bold ${
              isFinished && homeScore !== null && awayScore !== null && homeScore > awayScore
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-zinc-800 dark:text-zinc-200"
            }`}
          >
            {homeScore !== null ? homeScore : "-"}
          </span>
        </div>

        {/* Away Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            {match.awayTeam.crest ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={match.awayTeam.crest}
                alt=""
                className="h-5 w-5 shrink-0 object-contain"
                loading="lazy"
              />
            ) : (
              <div className="h-5 w-5 rounded-full bg-zinc-200 dark:bg-zinc-700" />
            )}
            <span
              className={`truncate text-sm font-medium ${
                isFinished && homeScore !== null && awayScore !== null && awayScore > homeScore
                  ? "font-bold text-zinc-900 dark:text-zinc-50"
                  : "text-zinc-700 dark:text-zinc-300"
              }`}
            >
              {match.awayTeam.shortName || match.awayTeam.name}
            </span>
          </div>
          <span
            className={`ml-3 text-sm font-bold ${
              isFinished && homeScore !== null && awayScore !== null && awayScore > homeScore
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-zinc-800 dark:text-zinc-200"
            }`}
          >
            {awayScore !== null ? awayScore : "-"}
          </span>
        </div>
      </div>
    </div>
  );
}

export async function MatchesView({ leagueCode }: MatchesViewProps) {
  const result = await getMatches(leagueCode);

  if (!result.success) {
    return (
      <ErrorMessage
        title="Gagal Memuat Jadwal & Hasil"
        message={result.error.message}
      />
    );
  }

  const { matches, season } = result.data;

  if (!matches || matches.length === 0) {
    return (
      <div className="rounded-xl border border-zinc-200 bg-white p-8 text-center text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
        Tidak ada pertandingan yang ditemukan untuk kompetisi ini.
      </div>
    );
  }

  // Filter into:
  // 1. Upcoming matches (SCHEDULED, TIMED, IN_PLAY, PAUSED)
  // 2. Finished matches (sorted by date descending)
  const currentMatchday = season?.currentMatchday || null;

  const upcomingMatches = matches
    .filter(
      (m) =>
        m.status === "SCHEDULED" ||
        m.status === "TIMED" ||
        m.status === "IN_PLAY" ||
        m.status === "PAUSED"
    )
    .slice(0, 10);

  const finishedMatches = matches
    .filter((m) => m.status === "FINISHED")
    .slice(-10)
    .reverse();

  return (
    <div className="space-y-8">
      {/* Jadwal Mendatang */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Jadwal Pertandingan Mendatang
          </h3>
          {currentMatchday && (
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Pekan ke-{currentMatchday} & selanjutnya
            </span>
          )}
        </div>

        {upcomingMatches.length === 0 ? (
          <p className="rounded-xl border border-zinc-200 bg-white p-6 text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
            Tidak ada jadwal pertandingan mendatang yang tersedia saat ini.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {upcomingMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </div>

      {/* Hasil Pertandingan Terakhir */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Hasil Pertandingan Terakhir
          </h3>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            10 laga terakhir
          </span>
        </div>

        {finishedMatches.length === 0 ? (
          <p className="rounded-xl border border-zinc-200 bg-white p-6 text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
            Belum ada hasil pertandingan terbaru.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {finishedMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
