import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/Card";

export default function Home() {
  const sportCategories = [
    {
      title: "Sepak Bola",
      href: "/sepak-bola",
      description: "Jadwal, hasil skor terkini, klasemen liga-liga top Eropa dan dunia.",
      icon: (
        <svg
          className="h-6 w-6 text-emerald-600 dark:text-emerald-400"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.75"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h6m-3-3v6"
          />
        </svg>
      ),
      badgeText: null,
      isActive: true,
    },
    {
      title: "Formula 1",
      href: "/f1",
      description: "Kalender Grand Prix, hasil kualifikasi & balapan, serta klasemen pembalap & konstruktor.",
      icon: (
        <svg
          className="h-6 w-6 text-red-600 dark:text-red-400"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.75"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
          />
        </svg>
      ),
      badgeText: null,
      isActive: true,
    },
    {
      title: "Basket",
      href: "/basket",
      description: "Hasil laga NBA, jadwal pertandingan mendatang, dan klasemen tiap konferensi.",
      icon: (
        <svg
          className="h-6 w-6 text-amber-600 dark:text-amber-400"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.75"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0c-2.5 0-5-4-5-9s2.5-9 5-9m0 18c2.5 0 5-4 5-9s-2.5-9-5-9m-9 9h18"
          />
        </svg>
      ),
      badgeText: null,
      isActive: true,
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header Banner */}
      <section className="rounded-2xl border border-zinc-200 bg-linear-to-b from-white to-zinc-50/50 p-6 shadow-xs sm:p-10 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 dark:border-emerald-800/60 dark:bg-emerald-950/40 dark:text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Sports Updates
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
              Dashboard Informasi Olahraga
            </h1>
            <p className="max-w-2xl text-base text-zinc-600 sm:text-lg dark:text-zinc-400">
              Pusat informasi lengkap olahraga favorit Anda. Pantau perkembangan sepak bola, Formula 1, dan bola basket dalam satu tempat.
            </p>
          </div>
        </div>
      </section>

      {/* Sport Category Cards */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Kategori Olahraga
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sportCategories.map((sport) => (
            <Link
              key={sport.href}
              href={sport.href}
              className="group block transition-transform focus:outline-hidden"
            >
              <Card className="h-full border-zinc-200 transition-all hover:-translate-y-0.5 hover:border-zinc-400 hover:shadow-md dark:border-zinc-800 dark:hover:border-zinc-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="rounded-lg bg-zinc-100 p-2.5 dark:bg-zinc-800">
                      {sport.icon}
                    </div>
                    {sport.badgeText ? (
                      <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                        {sport.badgeText}
                      </span>
                    ) : (
                      <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                        Data Aktif
                      </span>
                    )}
                  </div>
                  <CardTitle className="mt-3 text-lg group-hover:text-zinc-900 dark:group-hover:text-white">
                    {sport.title}
                  </CardTitle>
                  <CardDescription>{sport.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-2 text-xs font-medium text-zinc-500 group-hover:text-zinc-700 dark:text-zinc-400 dark:group-hover:text-zinc-300">
                  Buka halaman &rarr;
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
