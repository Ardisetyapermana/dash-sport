import { getStandings } from "@/lib/sports/basketball/client";
import { ErrorMessage } from "@/components/ErrorMessage";
import { StandingRow } from "@/lib/sports/basketball/types";

function formatWinPct(pct: number): string {
  if (typeof pct !== "number" || isNaN(pct)) return "-";
  return pct.toFixed(3).replace(/^0\./, ".");
}

function getPlayoffBadge(rank: number) {
  if (rank >= 1 && rank <= 6) {
    return (
      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
        Playoff
      </span>
    );
  }
  if (rank >= 7 && rank <= 10) {
    return (
      <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
        Play-in
      </span>
    );
  }
  return <span className="text-xs text-zinc-400 dark:text-zinc-600">-</span>;
}

function StandingsTable({
  title,
  rows,
}: {
  title: string;
  rows: StandingRow[];
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          {title}
        </h3>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          {rows.length} Tim
        </span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
        <table className="min-w-[720px] w-full text-left text-sm">
          <thead className="border-b border-zinc-200 bg-zinc-50 text-xs font-semibold text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-400">
            <tr>
              <th scope="col" className="w-12 py-3 px-3 text-center" title="Seed / Posisi">
                Pos
              </th>
              <th scope="col" className="py-3 px-4">
                Tim
              </th>
              <th scope="col" className="w-14 py-3 px-2 text-center" title="Menang (Wins)">
                M
              </th>
              <th scope="col" className="w-14 py-3 px-2 text-center" title="Kalah (Losses)">
                K
              </th>
              <th scope="col" className="w-16 py-3 px-2 text-center" title="Persentase Kemenangan">
                %
              </th>
              <th scope="col" className="w-14 py-3 px-2 text-center" title="Games Behind (Selisih Laga)">
                GB
              </th>
              <th scope="col" className="w-20 py-3 px-2 text-center" title="Rekor Kandang">
                Kandang
              </th>
              <th scope="col" className="w-20 py-3 px-2 text-center" title="Rekor Tandang">
                Tandang
              </th>
              <th scope="col" className="w-16 py-3 px-2 text-center" title="10 Laga Terakhir">
                L10
              </th>
              <th scope="col" className="w-16 py-3 px-2 text-center" title="Tren / Streak">
                Tren
              </th>
              <th scope="col" className="w-24 py-3 px-3 text-center" title="Status Playoff">
                Jalur
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
            {rows.map((row) => {
              const rank = row.conference_rank || row.league_rank;
              const isDirectPlayoff = rank >= 1 && rank <= 6;
              const isPlayIn = rank >= 7 && rank <= 10;

              return (
                <tr
                  key={row.team.team_id || row.team.name}
                  className="transition-colors hover:bg-zinc-50/70 dark:hover:bg-zinc-800/40"
                >
                  {/* Position / Seed */}
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                        isDirectPlayoff
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                          : isPlayIn
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
                          : "text-zinc-600 dark:text-zinc-400"
                      }`}
                    >
                      {rank}
                    </span>
                  </td>

                  {/* Team Name */}
                  <td className="py-3 px-4 font-medium text-zinc-900 dark:text-zinc-100">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-6 w-8 items-center justify-center rounded bg-zinc-100 text-[11px] font-bold text-zinc-700 uppercase dark:bg-zinc-800 dark:text-zinc-300">
                        {row.team.abbreviation || row.team.name.slice(0, 3)}
                      </div>
                      <div className="truncate max-w-[200px] sm:max-w-none">
                        <span>{row.team.name}</span>
                        {row.division && (
                          <span className="ml-2 text-xs font-normal text-zinc-400 dark:text-zinc-500 hidden sm:inline">
                            ({row.division})
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Wins */}
                  <td className="py-3 px-2 text-center font-semibold text-zinc-900 dark:text-zinc-100">
                    {row.wins}
                  </td>

                  {/* Losses */}
                  <td className="py-3 px-2 text-center text-zinc-600 dark:text-zinc-400">
                    {row.losses}
                  </td>

                  {/* Win Pct */}
                  <td className="py-3 px-2 text-center font-mono text-xs font-medium text-zinc-800 dark:text-zinc-200">
                    {formatWinPct(row.win_pct)}
                  </td>

                  {/* Games Behind */}
                  <td className="py-3 px-2 text-center text-xs text-zinc-600 dark:text-zinc-400">
                    {row.games_behind === 0 ? "-" : row.games_behind}
                  </td>

                  {/* Home */}
                  <td className="py-3 px-2 text-center text-xs text-zinc-600 dark:text-zinc-400">
                    {row.home_record || "-"}
                  </td>

                  {/* Away */}
                  <td className="py-3 px-2 text-center text-xs text-zinc-600 dark:text-zinc-400">
                    {row.away_record || "-"}
                  </td>

                  {/* Last 10 */}
                  <td className="py-3 px-2 text-center text-xs text-zinc-600 dark:text-zinc-400">
                    {row.last_10 || "-"}
                  </td>

                  {/* Streak */}
                  <td className="py-3 px-2 text-center text-xs">
                    <span
                      className={`font-semibold ${
                        row.streak?.startsWith("W")
                          ? "text-emerald-600 dark:text-emerald-400"
                          : row.streak?.startsWith("L")
                          ? "text-red-600 dark:text-red-400"
                          : "text-zinc-500"
                      }`}
                    >
                      {row.streak || "-"}
                    </span>
                  </td>

                  {/* Playoff Seed Badge */}
                  <td className="py-3 px-3 text-center">
                    {getPlayoffBadge(rank)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export async function BasketballStandingsView() {
  const result = await getStandings();

  if (!result.success) {
    return (
      <ErrorMessage
        title="Gagal Memuat Klasemen NBA"
        message={result.error.message}
      />
    );
  }

  const standings = result.data;

  if (!standings || standings.length === 0) {
    return (
      <div className="rounded-xl border border-zinc-200 bg-white p-8 text-center text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
        Data klasemen NBA belum tersedia saat ini.
      </div>
    );
  }

  // Group by conference
  const easternRows = standings
    .filter((s) => s.conference?.toLowerCase() === "eastern")
    .sort((a, b) => a.conference_rank - b.conference_rank);

  const westernRows = standings
    .filter((s) => s.conference?.toLowerCase() === "western")
    .sort((a, b) => a.conference_rank - b.conference_rank);

  const seasonLabel = standings[0]?.season_label || `${standings[0]?.season}`;

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400">
        <div>
          Kompetisi:{" "}
          <span className="font-semibold text-zinc-800 dark:text-zinc-200">
            National Basketball Association (NBA)
          </span>
        </div>
        <div>
          Musim:{" "}
          <span className="font-semibold text-zinc-800 dark:text-zinc-200">
            {seasonLabel}
          </span>
        </div>
      </div>

      {/* Eastern Conference */}
      {easternRows.length > 0 && (
        <StandingsTable
          title="Wilayah Timur (Eastern Conference)"
          rows={easternRows}
        />
      )}

      {/* Western Conference */}
      {westernRows.length > 0 && (
        <StandingsTable
          title="Wilayah Barat (Western Conference)"
          rows={westernRows}
        />
      )}

      {/* If conference data wasn't partitioned */}
      {easternRows.length === 0 && westernRows.length === 0 && (
        <StandingsTable
          title="Klasemen Keseluruhan NBA"
          rows={standings.sort((a, b) => a.league_rank - b.league_rank)}
        />
      )}

      {/* Legend */}
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400">
        <h4 className="font-semibold text-zinc-800 dark:text-zinc-200 mb-2">
          Keterangan Jalur Playoff:
        </h4>
        <div className="flex flex-wrap gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-emerald-500" />
            <span>Peringkat 1–6: Lolos langsung ke Babak Playoff</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-amber-500" />
            <span>Peringkat 7–10: Jalur Play-in Tournament</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <span>Peringkat 11–15: Gugur di Musim Reguler</span>
          </div>
        </div>
      </div>
    </div>
  );
}
