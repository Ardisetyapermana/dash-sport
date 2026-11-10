import Link from "next/link";

interface F1TabNavProps {
  currentTab: string;
}

const TABS = [
  { id: "pembalap", label: "Pembalap" },
  { id: "konstruktor", label: "Konstruktor" },
  { id: "kalender", label: "Kalender Balap" },
  { id: "hasil", label: "Hasil Terakhir" },
] as const;

export function F1TabNav({ currentTab }: F1TabNavProps) {
  const activeTab = currentTab || "pembalap";

  return (
    <div className="border-b border-zinc-200 dark:border-zinc-800">
      <nav
        className="-mb-px flex space-x-3 overflow-x-auto pb-px sm:space-x-8"
        aria-label="Tab Formula 1"
      >
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <Link
              key={tab.id}
              href={`/f1?tab=${tab.id}`}
              className={`shrink-0 border-b-2 py-3 px-1 text-sm font-medium transition-colors ${
                isActive
                  ? "border-red-600 text-red-600 dark:border-red-500 dark:text-red-400 font-semibold"
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
