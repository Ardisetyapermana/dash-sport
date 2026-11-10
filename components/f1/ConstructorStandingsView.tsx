import { getConstructorStandings } from "@/lib/sports/f1/client";
import { ErrorMessage } from "@/components/ErrorMessage";

export async function ConstructorStandingsView() {
  const result = await getConstructorStandings();

  if (!result.success) {
    return (
      <ErrorMessage
        title="Gagal Memuat Klasemen Konstruktor"
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
        <div>Total: {standings.length} Konstruktor</div>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
        <table className="min-w-[500px] w-full text-left text-sm">
          <thead className="border-b border-zinc-200 bg-zinc-50 text-xs font-semibold text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-400">
            <tr>
              <th scope="col" className="w-12 py-3 px-3 text-center">
                #
              </th>
              <th scope="col" className="py-3 px-4">
                Tim Konstruktor
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

              return (
                <tr
                  key={standing.Constructor.constructorId}
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

                  {/* Constructor Name & Nationality */}
                  <td className="py-3 px-4 font-medium text-zinc-900 dark:text-zinc-100">
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm sm:text-base">
                        {standing.Constructor.name}
                      </span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        {standing.Constructor.nationality}
                      </span>
                    </div>
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
