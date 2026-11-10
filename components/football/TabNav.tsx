import Link from "next/link";

interface TabNavProps {
  currentLeague: string;
  currentTab: string;
}

const TABS = [
  { id: "klasemen", label: "Klasemen" },
  { id: "jadwal", label: "Jadwal & Hasil" },
  { id: "top-skorer", label: "Top Skorer" },
] as const;

export function TabNav({ currentLeague, currentTab }: TabNavProps) {
  const activeTab = currentTab || "klasemen";

  return (
    <div className="border-b border-zinc-200 dark:border-zinc-800">
      <nav className="-mb-px flex space-x-4 sm:space-x-8" aria-label="Tab Kompetisi">
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <Link
              key={tab.id}
              href={`/sepak-bola?liga=${currentLeague}&tab=${tab.id}`}
              className={`border-b-2 py-3 px-1 text-sm font-medium transition-colors ${
                isActive
                  ? "border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400 font-semibold"
                  : "border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-300"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
