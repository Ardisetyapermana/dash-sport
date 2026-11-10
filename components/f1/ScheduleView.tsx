import { connection } from "next/server";
import { getSchedule } from "@/lib/sports/f1/client";
import { ErrorMessage } from "@/components/ErrorMessage";
import { F1Race } from "@/lib/sports/f1/types";

function formatF1DateTime(dateStr: string, timeStr?: string): { date: string; time: string } {
  try {
    const isoString = timeStr ? `${dateStr}T${timeStr}` : `${dateStr}T12:00:00Z`;
    const d = new Date(isoString);
    const dateFormatted = new Intl.DateTimeFormat("id-ID", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "Asia/Jakarta",
    }).format(d);

    const timeFormatted = timeStr
      ? `${new Intl.DateTimeFormat("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Jakarta",
        }).format(d)} WIB`
      : "Waktu TBA";

    return { date: dateFormatted, time: timeFormatted };
  } catch {
    return { date: dateStr, time: timeStr || "" };
  }
}

export async function ScheduleView() {
  const result = await getSchedule();

  if (!result.success) {
    return (
      <ErrorMessage
        title="Gagal Memuat Kalender Balap"
        message={result.error.message}
      />
    );
  }

  const { races, season } = result.data;
  await connection();
  const now = new Date();

  // Find the index of the next race (first race whose date/time is in the future)
  let nextRaceIndex = -1;
  for (let i = 0; i < races.length; i++) {
    const r = races[i];
    const raceDateTime = new Date(
      r.time ? `${r.date}T${r.time}` : `${r.date}T23:59:59Z`
    );
    if (raceDateTime.getTime() >= now.getTime()) {
      nextRaceIndex = i;
      break;
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400">
        <div>
          Musim:{" "}
          <span className="font-semibold text-zinc-800 dark:text-zinc-200">
            F1 {season}
          </span>
        </div>
        <div>Total: {races.length} Seri Grand Prix</div>
      </div>

      {/* Grid of Races */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {races.map((race: F1Race, index: number) => {
          const isNextRace = index === nextRaceIndex;
          const raceDateTime = new Date(
            race.time ? `${race.date}T${race.time}` : `${race.date}T23:59:59Z`
          );
          const isFinished = raceDateTime.getTime() < now.getTime();
          const { date, time } = formatF1DateTime(race.date, race.time);

          return (
            <div
              key={`${race.season}-${race.round}`}
              className={`flex flex-col justify-between rounded-xl border p-4 shadow-xs transition-colors ${
                isNextRace
                  ? "border-red-500/80 bg-red-50/30 ring-1 ring-red-500/40 dark:border-red-500/60 dark:bg-red-950/20"
                  : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
              }`}
            >
              <div>
                {/* Round & Status Badge */}
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                    Putaran {race.round}
                  </span>
                  {isNextRace ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-2.5 py-0.5 text-[11px] font-semibold text-white shadow-xs">
                      <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                      Balapan Berikutnya
                    </span>
                  ) : isFinished ? (
                    <span className="rounded bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                      Selesai
                    </span>
                  ) : (
                    <span className="rounded bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                      Mendatang
                    </span>
                  )}
                </div>

                {/* Race Name & Circuit */}
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  {race.raceName}
                </h3>
                <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                  {race.Circuit.circuitName}
                </p>
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  {race.Circuit.Location.locality}, {race.Circuit.Location.country}
                </p>
              </div>

              {/* Date & Time */}
              <div className="mt-4 border-t border-zinc-100 pt-3 text-xs dark:border-zinc-800/80">
                <div className="flex items-center justify-between text-zinc-700 dark:text-zinc-300">
                  <span>{date}</span>
                  <span className="font-semibold text-red-600 dark:text-red-400">
                    {time}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
