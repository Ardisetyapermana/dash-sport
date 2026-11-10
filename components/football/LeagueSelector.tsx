import Link from "next/link";
import {
  SUPPORTED_COMPETITIONS,
  DEFAULT_COMPETITION,
} from "@/lib/sports/football/competitions";

interface LeagueSelectorProps {
  currentLeague: string;
  currentTab: string;
}

export function LeagueSelector({
  currentLeague,
  currentTab,
}: LeagueSelectorProps) {
  const activeCode = (currentLeague || DEFAULT_COMPETITION).toUpperCase();

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
          Pilih Liga / Kompetisi
        </label>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none sm:flex-wrap">
        {SUPPORTED_COMPETITIONS.map((comp) => {
          const isActive = comp.code === activeCode;
          return (
            <Link
              key={comp.code}
              href={`/sepak-bola?liga=${comp.code}&tab=${currentTab}`}
              className={`shrink-0 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all sm:text-sm ${
                isActive
                  ? "bg-emerald-600 text-white shadow-xs dark:bg-emerald-500 dark:text-zinc-950"
                  : "border border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
              }`}
            >
              <span>{comp.name}</span>
              <span
                className={`ml-1.5 text-[11px] font-normal ${
                  isActive
                    ? "text-emerald-100 dark:text-zinc-900/80"
                    : "text-zinc-400 dark:text-zinc-500"
                }`}
              >
                ({comp.country})
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
