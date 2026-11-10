import { getDriverStandings } from "@/lib/sports/f1/client";
import { ErrorMessage } from "@/components/ErrorMessage";

export async function DriverStandingsView() {
  const result = await getDriverStandings();

  if (!result.success) {
    return (
      <ErrorMessage
        title="Gagal Memuat Klasemen Pembalap"
        message={result.error.message}
      />
    );
  }

  const { standings, season, round } = result.data;

  return (
    <div className="space-y-4">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400">
        <div>
          Musim:{" "}
          <span className="font-semibold text-zinc-800 dark:text-zinc-200">
            F1 {season}
          </span>
          {round && <span className="ml-2">(Putaran {round})</span>}
        </div>
        <div>Total: {standings.length} Pembalap</div>
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
                Pembalap
              </th>
              <th scope="col" className="py-3 px-4">
                Tim
              </th>
              <th scope="col" className="w-20 py-3 px-3 text-center" title="Kemenangan Balap">
                Menang
              </th>
              <th
                scope="col"
                className="w-20 py-3 px-3 text-center font-bold text-zinc-900 dark:text-zinc-100"
                title="Total Poin"
              >
                Poin
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
            {standings.map((standing) => {
              const posNumber = parseInt(standing.position, 10);
              const isTop3 = posNumber <= 3;
              const constructorNames = standing.Constructors.map((c) => c.name).join(", ");

              return (
                <tr
                  key={standing.Driver.driverId}
                  className="transition-colors hover:bg-zinc-50/70 dark:hover:bg-zinc-800/40"
                >
                  {/* Position */}
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                        posNumber === 1
                          ? "bg-amber-100 text-amber-900 dark:bg-amber-950/70 dark:text-amber-300"
                          : isTop3
                          ? "bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
                          : "text-zinc-600 dark:text-zinc-400"
                      }`}
                    >
                      {standing.position}
                    </span>
                  </td>

                  {/* Driver Name & Number */}
                  <td className="py-3 px-4 font-medium text-zinc-900 dark:text-zinc-100">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold">
                          {standing.Driver.givenName} {standing.Driver.familyName}
                        </span>
                        {standing.Driver.permanentNumber && (
                          <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                            #{standing.Driver.permanentNumber}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        {standing.Driver.nationality}
                      </span>
                    </div>
                  </td>

                  {/* Constructor Team */}
                  <td className="py-3 px-4 text-zinc-700 dark:text-zinc-300">
                    <span className="text-xs sm:text-sm">{constructorNames}</span>
                  </td>

                  {/* Wins */}
                  <td className="py-3 px-3 text-center text-zinc-600 dark:text-zinc-400">
                    {standing.wins}
                  </td>

                  {/* Points */}
                  <td className="py-3 px-3 text-center font-bold text-red-600 dark:text-red-400">
                    {standing.points}
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
