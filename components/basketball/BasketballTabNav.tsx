import Link from "next/link";

interface BasketballTabNavProps {
  currentTab: string;
}

const TABS = [
  { id: "klasemen", label: "Klasemen" },
  { id: "jadwal", label: "Jadwal & Skor" },
] as const;

export function BasketballTabNav({ currentTab }: BasketballTabNavProps) {
  const activeTab = currentTab || "klasemen";

  return (
    <div className="border-b border-zinc-200 dark:border-zinc-800">
      <nav
        className="-mb-px flex space-x-4 sm:space-x-8 overflow-x-auto pb-px"
        aria-label="Tab Bola Basket"
      >
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <Link
              key={tab.id}
              href={`/basket?tab=${tab.id}`}
              className={`shrink-0 border-b-2 py-3 px-1 text-sm font-medium transition-colors ${
                isActive
                  ? "border-amber-600 text-amber-600 dark:border-amber-500 dark:text-amber-400 font-semibold"
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
