import { getStandings } from "@/lib/sports/football/client";
import { ErrorMessage } from "@/components/ErrorMessage";

interface StandingsViewProps {
  leagueCode: string;
}

export async function StandingsView({ leagueCode }: StandingsViewProps) {
  const result = await getStandings(leagueCode);

  if (!result.success) {
    return (
      <ErrorMessage
        title="Gagal Memuat Klasemen"
        message={result.error.message}
      />
    );
  }

  const { standings, competition, season } = result.data;

  if (!standings || standings.length === 0) {
    return (
      <div className="rounded-xl border border-zinc-200 bg-white p-8 text-center text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
        Data klasemen belum tersedia untuk kompetisi ini.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Competition & Season Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400">
        <div>
          Kompetisi:{" "}
          <span className="font-semibold text-zinc-800 dark:text-zinc-200">
            {competition.name}
          </span>
          {season?.currentMatchday && (
            <span className="ml-2">
              (Pekan ke-{season.currentMatchday})
            </span>
          )}
        </div>
        <div>
          Musim: {season.startDate ? season.startDate.slice(0, 4) : ""}/
          {season.endDate ? season.endDate.slice(0, 4) : ""}
        </div>
      </div>

      {standings.map((group, groupIdx) => (
        <div key={groupIdx} className="space-y-3">
          {group.group && (
            <h3 className="text-sm font-semibold tracking-wide text-zinc-700 uppercase dark:text-zinc-300">
              {group.group.replace("_", " ")}
            </h3>
          )}

          {/* Responsive table container with horizontal scroll */}
          <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <table className="min-w-[640px] w-full text-left text-sm">
              <thead className="border-b border-zinc-200 bg-zinc-50 text-xs font-semibold text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-400">
                <tr>
                  <th scope="col" className="w-12 py-3 px-3 text-center">
                    #
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Tim
                  </th>
                  <th scope="col" className="w-14 py-3 px-2 text-center" title="Main">
                    M
                  </th>
                  <th scope="col" className="w-14 py-3 px-2 text-center" title="Menang">
                    Mn
                  </th>
                  <th scope="col" className="w-14 py-3 px-2 text-center" title="Seri">
                    S
                  </th>
                  <th scope="col" className="w-14 py-3 px-2 text-center" title="Kalah">
                    K
                  </th>
                  <th scope="col" className="w-20 py-3 px-2 text-center" title="Gol Masuk - Gol Kemasukan">
                    Gol
                  </th>
                  <th scope="col" className="w-16 py-3 px-2 text-center" title="Selisih Gol">
                    SG
                  </th>
                  <th scope="col" className="w-16 py-3 px-3 text-center font-bold text-zinc-900 dark:text-zinc-100" title="Poin">
                    Poin
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                {group.table.map((row) => {
                  const isTop4 = row.position <= 4;
                  const isRelegation =
                    row.position >= group.table.length - 2 &&
                    group.table.length > 6;

                  return (
                    <tr
                      key={row.team.id}
                      className="transition-colors hover:bg-zinc-50/70 dark:hover:bg-zinc-800/40"
                    >
                      {/* Position */}
                      <td className="py-3 px-3 text-center">
                        <span
                          className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                            isTop4
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                              : isRelegation
                              ? "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300"
                              : "text-zinc-600 dark:text-zinc-400"
                          }`}
                        >
                          {row.position}
                        </span>
                      </td>

                      {/* Team Name + Crest */}
                      <td className="py-3 px-4 font-medium text-zinc-900 dark:text-zinc-100">
                        <div className="flex items-center gap-2.5">
                          {row.team.crest ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={row.team.crest}
                              alt=""
                              className="h-5 w-5 shrink-0 object-contain"
                              loading="lazy"
                            />
                          ) : (
                            <div className="h-5 w-5 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                          )}
                          <span className="truncate max-w-[180px] sm:max-w-none">
                            {row.team.shortName || row.team.name}
                          </span>
                        </div>
                      </td>

                      {/* Played Games */}
                      <td className="py-3 px-2 text-center text-zinc-600 dark:text-zinc-400">
                        {row.playedGames}
                      </td>

                      {/* Won */}
                      <td className="py-3 px-2 text-center text-zinc-600 dark:text-zinc-400">
                        {row.won}
                      </td>

                      {/* Draw */}
                      <td className="py-3 px-2 text-center text-zinc-600 dark:text-zinc-400">
                        {row.draw}
                      </td>

                      {/* Lost */}
                      <td className="py-3 px-2 text-center text-zinc-600 dark:text-zinc-400">
                        {row.lost}
                      </td>

                      {/* Goals (GF - GA) */}
                      <td className="py-3 px-2 text-center text-xs text-zinc-500 dark:text-zinc-400">
                        {row.goalsFor}:{row.goalsAgainst}
                      </td>

                      {/* Goal Difference */}
                      <td className="py-3 px-2 text-center font-medium">
                        <span
                          className={
                            row.goalDifference > 0
                              ? "text-emerald-600 dark:text-emerald-400"
                              : row.goalDifference < 0
                              ? "text-red-600 dark:text-red-400"
                              : "text-zinc-500"
                          }
                        >
                          {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                        </span>
                      </td>

                      {/* Points */}
                      <td className="py-3 px-3 text-center font-bold text-zinc-900 dark:text-zinc-50">
                        {row.points}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
