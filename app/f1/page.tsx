import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/Card";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";

export default function F1Page() {
  const sections = [
    {
      title: "Klasemen Pembalap & Konstruktor",
      desc: "Posisi poin terkini kejuaraan dunia Formula 1 untuk pembalap dan tim konstruktor.",
    },
    {
      title: "Kalender Grand Prix",
      desc: "Jadwal lengkap seri balap F1 musim ini beserta sesi latihan, kualifikasi, dan sprint.",
    },
    {
      title: "Hasil Balapan Terakhir",
      desc: "Hasil podium, catatan putaran tercepat (fastest lap), dan waktu finis setiap putaran GP.",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-3 border-b border-zinc-200 pb-6 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800">
        <div>
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-800 dark:border-amber-800/60 dark:bg-amber-950/40 dark:text-amber-300">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
            Segera hadir
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Formula 1 (F1)
          </h1>
          <p className="mt-1 text-sm text-zinc-600 sm:text-base dark:text-zinc-400">
            Informasi lengkap kejuaraan dunia Formula 1: kalender balap, hasil GP, serta klasemen pembalap & konstruktor.
          </p>
        </div>
      </div>

      {/* Feature Placeholders */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <Card key={section.title} className="flex flex-col justify-between">
            <div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                    Segera hadir
                  </span>
                </div>
                <CardTitle className="mt-2 text-base">{section.title}</CardTitle>
                <CardDescription>{section.desc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 pt-2">
                <LoadingSkeleton variant="text" count={2} />
              </CardContent>
            </div>
            <div className="mt-4 pt-3 text-xs text-zinc-500 dark:text-zinc-500">
              Integrasi API publik Formula 1
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
