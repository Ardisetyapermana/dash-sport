import Link from "next/link";
import { connection } from "next/server";
import { getGames } from "@/lib/sports/basketball/client";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Game } from "@/lib/sports/basketball/types";

interface BasketballGamesViewProps {
  selectedDate?: string;
}

function formatWIBTime(isoStr: string): string {
  try {
    const d = new Date(isoStr);
    return (
      new Intl.DateTimeFormat("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Jakarta",
      }).format(d) + " WIB"
    );
  } catch {
    return isoStr;
  }
}

function formatIndoDateHeading(dateStr: string): string {
  try {
    const [y, m, d] = dateStr.split("-");
    const date = new Date(Date.UTC(+y, +m - 1, +d, 12));
    return new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Jakarta",
    }).format(date);
  } catch {
    return dateStr;
  }
}

function formatShortDate(dateStr: string): string {
  try {
    const [y, m, d] = dateStr.split("-");
    const date = new Date(Date.UTC(+y, +m - 1, +d, 12));
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      timeZone: "Asia/Jakarta",
    }).format(date);
  } catch {
    return dateStr;
  }
}

function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case "final":
      return (
        <span className="rounded bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
          Selesai
        </span>
      );
    case "in_play":
      return (
        <span className="inline-flex items-center gap-1 rounded bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
          Sedang Tanding
        </span>
      );
    case "scheduled":
      return (
        <span className="rounded bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
          Akan Datang
        </span>
      );
    case "postponed":
      return (
        <span className="rounded bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
          Ditunda
        </span>
      );
    case "cancelled":
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

function GameCard({ game }: { game: Game }) {
  const isFinished = game.status.toLowerCase() === "final";
  const isScheduled = game.status.toLowerCase() === "scheduled";
  const homeWon =
    isFinished &&
    game.home_score !== null &&
    game.away_score !== null &&
    game.home_score > game.away_score;
  const awayWon =
    isFinished &&
    game.home_score !== null &&
    game.away_score !== null &&
    game.away_score > game.home_score;

  return (
    <div className="flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-4 shadow-xs transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
      <div>
        {/* Header: Start time & Status */}
        <div className="mb-3 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-1.5">
            <svg
              className="h-3.5 w-3.5 text-zinc-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <span className="font-medium">{formatWIBTime(game.start_time)}</span>
          </div>
          {getStatusBadge(game.status)}
        </div>

        {/* Teams & Scores */}
        <div className="space-y-2.5">
          {/* Away Team (Tamu) */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-bold text-zinc-600 uppercase dark:bg-zinc-800 dark:text-zinc-400">
                Tamu
              </span>
              <span className="flex h-5 w-7 items-center justify-center rounded bg-zinc-200/60 text-[10px] font-bold text-zinc-700 uppercase dark:bg-zinc-700/60 dark:text-zinc-300">
                {game.away_team.abbreviation || game.away_team.name.slice(0, 3)}
              </span>
              <span
                className={`truncate text-sm ${
                  awayWon
                    ? "font-bold text-zinc-900 dark:text-zinc-50"
                    : "font-medium text-zinc-700 dark:text-zinc-300"
                }`}
              >
                {game.away_team.name}
              </span>
            </div>
            <span
              className={`ml-3 text-base font-bold ${
                awayWon
                  ? "text-emerald-600 dark:text-emerald-400"
                  : isFinished
                  ? "text-zinc-700 dark:text-zinc-300"
                  : "text-zinc-400 dark:text-zinc-600"
              }`}
            >
              {game.away_score !== null ? game.away_score : "-"}
            </span>
          </div>

          {/* Home Team (Tuan Rumah) */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-bold text-amber-700 uppercase dark:bg-amber-950/50 dark:text-amber-300">
                Kandang
              </span>
              <span className="flex h-5 w-7 items-center justify-center rounded bg-zinc-200/60 text-[10px] font-bold text-zinc-700 uppercase dark:bg-zinc-700/60 dark:text-zinc-300">
                {game.home_team.abbreviation || game.home_team.name.slice(0, 3)}
              </span>
              <span
                className={`truncate text-sm ${
                  homeWon
                    ? "font-bold text-zinc-900 dark:text-zinc-50"
                    : "font-medium text-zinc-700 dark:text-zinc-300"
                }`}
              >
                {game.home_team.name}
              </span>
            </div>
            <span
              className={`ml-3 text-base font-bold ${
                homeWon
                  ? "text-emerald-600 dark:text-emerald-400"
                  : isFinished
                  ? "text-zinc-700 dark:text-zinc-300"
                  : "text-zinc-400 dark:text-zinc-600"
              }`}
            >
              {game.home_score !== null ? game.home_score : "-"}
            </span>
          </div>
        </div>

        {/* Period Scores (Kuarter) if available */}
        {isFinished && game.period_scores && game.period_scores.home?.length > 0 && (
          <div className="mt-3 rounded-lg bg-zinc-50 px-2.5 py-1.5 text-[11px] text-zinc-500 dark:bg-zinc-800/50 dark:text-zinc-400">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-zinc-600 dark:text-zinc-300">
                Skor Kuarter:
              </span>
              <div className="flex gap-2 font-mono">
                {game.period_scores.away.map((score, idx) => (
                  <span key={idx} title={`Q${idx + 1}`}>
                    Q{idx + 1}: {score}-{game.period_scores?.home?.[idx]}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info: Venue & Date */}
      <div className="mt-3 flex items-center justify-between border-t border-zinc-100 pt-2 text-[11px] text-zinc-500 dark:border-zinc-800/80 dark:text-zinc-400">
        <span className="truncate max-w-[200px]" title={game.venue?.name || ""}>
          {game.venue?.name ? `${game.venue.name}, ${game.venue.city}` : "Lokasi TBA"}
        </span>
        {isScheduled && (
          <span className="shrink-0 text-amber-600 dark:text-amber-400 font-medium">
            Mendatang
          </span>
        )}
      </div>
    </div>
  );
}

function getEasternDateString(date: Date, dayOffset = 0): string {
  const d = new Date(date.getTime() + dayOffset * 86400000);
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(d);
  const year = parts.find((p) => p.type === "year")?.value;
  const month = parts.find((p) => p.type === "month")?.value;
  const day = parts.find((p) => p.type === "day")?.value;
  return `${year}-${month}-${day}`;
}

export async function BasketballGamesView({
  selectedDate,
}: BasketballGamesViewProps) {
  // Respect Next.js 16 dynamic rendering requirement
  await connection();
  const now = new Date();

  // Determine target dates
  const yesterdayDate = getEasternDateString(now, -1);
  const todayDate = getEasternDateString(now, 0);
  const tomorrowDate = getEasternDateString(now, 1);

  const availableDates = [
    { date: yesterdayDate, label: `Kemarin (${formatShortDate(yesterdayDate)})` },
    { date: todayDate, label: `Hari Ini (${formatShortDate(todayDate)})` },
    { date: tomorrowDate, label: `Besok (${formatShortDate(tomorrowDate)})` },
  ];

  let games: Game[] = [];
  let errorMessage: string | null = null;

  if (selectedDate) {
    const res = await getGames({ date: selectedDate });
    if (res.success) {
      games = res.data;
    } else {
      errorMessage = res.error.message;
    }
  } else {
    // Fetch window of 3 days: yesterday (scores), today, and tomorrow (schedule)
    const results = await Promise.all([
      getGames({ date: yesterdayDate }),
      getGames({ date: todayDate }),
      getGames({ date: tomorrowDate }),
    ]);

    const collected: Game[] = [];
    results.forEach((res) => {
      if (res.success && res.data) {
        collected.push(...res.data);
      }
    });

    // If all failed, check if the default getGames() works
    if (collected.length === 0) {
      const fallback = await getGames();
      if (fallback.success && fallback.data) {
        collected.push(...fallback.data);
      } else {
        errorMessage =
          results[0].success === false
            ? results[0].error.message
            : "Tidak dapat memuat jadwal pertandingan.";
      }
    }

    games = collected;
  }

  if (errorMessage && games.length === 0) {
    return (
      <ErrorMessage
        title="Gagal Memuat Jadwal & Skor Basket"
        message={errorMessage}
      />
    );
  }

  if (games.length === 0) {
    return (
      <div className="space-y-4">
        {/* Date Filter Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/basket?tab=jadwal"
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              !selectedDate
                ? "bg-amber-600 text-white dark:bg-amber-500"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            }`}
          >
            Semua
          </Link>
          {availableDates.map((item) => (
            <Link
              key={item.date}
              href={`/basket?tab=jadwal&date=${item.date}`}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedDate === item.date
                  ? "bg-amber-600 text-white dark:bg-amber-500"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-8 text-center text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
          Tidak ada pertandingan basket yang ditemukan untuk jadwal ini.
        </div>
      </div>
    );
  }

  // Group games by date
  const groupedByDate = new Map<string, Game[]>();
  games.forEach((game) => {
    const key = game.date;
    if (!groupedByDate.has(key)) {
      groupedByDate.set(key, []);
    }
    groupedByDate.get(key)!.push(game);
  });

  // Sort dates chronologically
  const sortedDates = Array.from(groupedByDate.keys()).sort();

  return (
    <div className="space-y-8">
      {/* Date Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/basket?tab=jadwal"
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              !selectedDate
                ? "bg-amber-600 text-white dark:bg-amber-500 font-semibold"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            }`}
          >
            Semua Hari
          </Link>
          {availableDates.map((item) => (
            <Link
              key={item.date}
              href={`/basket?tab=jadwal&date=${item.date}`}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedDate === item.date
                  ? "bg-amber-600 text-white dark:bg-amber-500 font-semibold"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          Waktu disesuaikan dengan WIB (Asia/Jakarta)
        </span>
      </div>

      {/* Date Groups */}
      {sortedDates.map((dateStr) => {
        const dayGames = groupedByDate.get(dateStr) || [];
        const finishedCount = dayGames.filter(
          (g) => g.status.toLowerCase() === "final"
        ).length;
        const scheduledCount = dayGames.filter(
          (g) => g.status.toLowerCase() === "scheduled"
        ).length;

        return (
          <div key={dateStr} className="space-y-4">
            {/* Date Section Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 pb-2 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  {formatIndoDateHeading(dateStr)}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                {finishedCount > 0 && (
                  <span className="rounded bg-zinc-100 px-2 py-0.5 dark:bg-zinc-800">
                    {finishedCount} Selesai
                  </span>
                )}
                {scheduledCount > 0 && (
                  <span className="rounded bg-blue-50 px-2 py-0.5 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
                    {scheduledCount} Terjadwal
                  </span>
                )}
                <span>Total: {dayGames.length} Laga</span>
              </div>
            </div>

            {/* Grid of Games for this date */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {dayGames.map((game) => (
                <GameCard key={game.game_id} game={game} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
