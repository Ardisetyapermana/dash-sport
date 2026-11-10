import { getLastRaceResults } from "@/lib/sports/f1/client";
import { ErrorMessage } from "@/components/ErrorMessage";

export async function LastResultsView() {
  const result = await getLastRaceResults();

  if (!result.success) {
    return (
      <ErrorMessage
        title="Gagal Memuat Hasil Balapan Terakhir"
        message={result.error.message}
      />
    );
  }

  const { race, season, round } = result.data;
  const results = race.Results || [];

  return (
    <div className="space-y-6">
      {/* Race Information Banner */}
      <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-xs font-semibold text-red-600 uppercase tracking-wider dark:text-red-400">
              Hasil Balapan Terakhir &bull; Putaran {round} (Musim {season})
            </span>
            <h2 className="mt-1 text-xl font-bold text-zinc-900 sm:text-2xl dark:text-zinc-50">
              {race.raceName}
            </h2>
            <p className="mt-0.5 text-xs text-zinc-500 sm:text-sm dark:text-zinc-400">
              {race.Circuit.circuitName} &bull; {race.Circuit.Location.locality},{" "}
              {race.Circuit.Location.country}
            </p>
          </div>
          <div className="text-xs text-zinc-500 sm:text-right dark:text-zinc-400">
            Tanggal: {race.date}
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
        <table className="min-w-[620px] w-full text-left text-sm">
          <thead className="border-b border-zinc-200 bg-zinc-50 text-xs font-semibold text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-400">
            <tr>
              <th scope="col" className="w-12 py-3 px-3 text-center">
                Pos
              </th>
              <th scope="col" className="py-3 px-4">
                Pembalap
              </th>
              <th scope="col" className="py-3 px-4">
                Tim
              </th>
              <th scope="col" className="w-16 py-3 px-2 text-center" title="Posisi Grid Awal">
                Grid
              </th>
              <th scope="col" className="py-3 px-3">
                Waktu / Status
              </th>
              <th
                scope="col"
                className="w-16 py-3 px-3 text-center font-bold text-zinc-900 dark:text-zinc-100"
                title="Poin yang diraih"
              >
                Poin
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
            {results.map((res) => {
              const posNumber = parseInt(res.position, 10);
              const isPodium = posNumber <= 3;
              const hasFastestLap = res.FastestLap?.rank === "1";

              // Display time: if finished with time use Time.time, else status
              const timeDisplay =
                res.status === "Finished" && res.Time?.time
                  ? res.Time.time
                  : res.status;

              return (
                <tr
                  key={`${res.Driver.driverId}-${res.position}`}
                  className="transition-colors hover:bg-zinc-50/70 dark:hover:bg-zinc-800/40"
                >
                  {/* Position */}
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                        posNumber === 1
                          ? "bg-amber-100 text-amber-900 dark:bg-amber-950/70 dark:text-amber-300"
                          : isPodium
                          ? "bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
                          : "text-zinc-600 dark:text-zinc-400"
                      }`}
                    >
                      {res.positionText || res.position}
                    </span>
                  </td>

                  {/* Driver */}
                  <td className="py-3 px-4 font-medium text-zinc-900 dark:text-zinc-100">
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col">
                        <span className="font-semibold">
                          {res.Driver.givenName} {res.Driver.familyName}
                        </span>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                          {res.Driver.nationality}
                        </span>
                      </div>
                      {hasFastestLap && (
                        <span
                          className="rounded bg-purple-100 px-1.5 py-0.5 text-[10px] font-bold text-purple-800 dark:bg-purple-950/60 dark:text-purple-300"
                          title="Fastest Lap (+1 Poin)"
                        >
                          FL
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Team */}
                  <td className="py-3 px-4 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                    {res.Constructor.name}
                  </td>

                  {/* Grid */}
                  <td className="py-3 px-2 text-center text-xs text-zinc-500 dark:text-zinc-400">
                    {res.grid}
                  </td>

                  {/* Time / Status */}
                  <td className="py-3 px-3 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                    <span
                      className={
                        res.status === "Finished"
                          ? "font-mono font-medium"
                          : "text-zinc-500 dark:text-zinc-400 italic"
                      }
                    >
                      {timeDisplay}
                    </span>
                  </td>

                  {/* Points */}
                  <td className="py-3 px-3 text-center font-bold text-red-600 dark:text-red-400">
                    {res.points}
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
