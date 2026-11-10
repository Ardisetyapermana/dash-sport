import { getTopScorers } from "@/lib/sports/football/client";
import { ErrorMessage } from "@/components/ErrorMessage";

interface TopScorersViewProps {
  leagueCode: string;
}

export async function TopScorersView({ leagueCode }: TopScorersViewProps) {
  const result = await getTopScorers(leagueCode);

  if (!result.success) {
    return (
      <ErrorMessage
        title="Gagal Memuat Top Skorer"
        message={result.error.message}
      />
    );
  }

  const { scorers, competition, season } = result.data;

  if (!scorers || scorers.length === 0) {
    return (
      <div className="rounded-xl border border-zinc-200 bg-white p-8 text-center text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
        Data pencetak gol belum tersedia untuk kompetisi ini.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400">
        <div>
          Kompetisi:{" "}
          <span className="font-semibold text-zinc-800 dark:text-zinc-200">
            {competition.name}
          </span>
        </div>
        <div>
          Musim: {season.startDate ? season.startDate.slice(0, 4) : ""}/
          {season.endDate ? season.endDate.slice(0, 4) : ""}
        </div>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
        <table className="min-w-[560px] w-full text-left text-sm">
          <thead className="border-b border-zinc-200 bg-zinc-50 text-xs font-semibold text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-400">
            <tr>
              <th scope="col" className="w-12 py-3 px-3 text-center">
                #
              </th>
              <th scope="col" className="py-3 px-4">
                Pemain
              </th>
              <th scope="col" className="py-3 px-4">
                Klub
              </th>
              <th scope="col" className="w-16 py-3 px-2 text-center" title="Pertandingan Dimainkan">
                Laga
              </th>
              <th scope="col" className="w-16 py-3 px-2 text-center" title="Umpan Gol / Assist">
                Assist
              </th>
              <th scope="col" className="w-16 py-3 px-3 text-center font-bold text-zinc-900 dark:text-zinc-100" title="Total Gol">
                Gol
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
            {scorers.map((scorer, idx) => {
              const rank = idx + 1;
              const isTop3 = rank <= 3;

              return (
                <tr
                  key={`${scorer.player.id}-${idx}`}
                  className="transition-colors hover:bg-zinc-50/70 dark:hover:bg-zinc-800/40"
                >
                  {/* Rank */}
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                        isTop3
                          ? "bg-amber-100 text-amber-900 dark:bg-amber-950/70 dark:text-amber-300"
                          : "text-zinc-600 dark:text-zinc-400"
                      }`}
                    >
                      {rank}
                    </span>
                  </td>

                  {/* Player Name & Nationality */}
                  <td className="py-3 px-4 font-medium text-zinc-900 dark:text-zinc-100">
                    <div className="flex flex-col">
                      <span className="font-semibold">{scorer.player.name}</span>
                      {scorer.player.nationality && (
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                          {scorer.player.nationality}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Club */}
                  <td className="py-3 px-4 text-zinc-700 dark:text-zinc-300">
                    <div className="flex items-center gap-2">
                      {scorer.team.crest ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={scorer.team.crest}
                          alt=""
                          className="h-4 w-4 shrink-0 object-contain"
                          loading="lazy"
                        />
                      ) : (
                        <div className="h-4 w-4 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                      )}
                      <span className="truncate max-w-[150px] text-xs sm:text-sm">
                        {scorer.team.shortName || scorer.team.name}
                      </span>
                    </div>
                  </td>

                  {/* Played Matches */}
                  <td className="py-3 px-2 text-center text-zinc-600 dark:text-zinc-400">
                    {scorer.playedMatches}
                  </td>

                  {/* Assists */}
                  <td className="py-3 px-2 text-center text-zinc-600 dark:text-zinc-400">
                    {scorer.assists !== null && scorer.assists !== undefined
                      ? scorer.assists
                      : "-"}
                  </td>

                  {/* Total Goals */}
                  <td className="py-3 px-3 text-center font-bold text-emerald-600 dark:text-emerald-400">
                    {scorer.goals}
                    {scorer.penalties && scorer.penalties > 0 ? (
                      <span className="ml-1 text-[11px] font-normal text-zinc-500 dark:text-zinc-400">
                        ({scorer.penalties}p)
                      </span>
                    ) : null}
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
