import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/Card";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";

export default function SepakBolaPage() {
  const sections = [
    {
      title: "Klasemen Liga",
      desc: "Klasemen terkini dari Premier League, La Liga, Serie A, dan liga top lainnya.",
    },
    {
      title: "Jadwal & Hasil Pertandingan",
      desc: "Skor pertandingan langsung, hasil laga sebelumnya, dan jadwal tanding pekan ini.",
    },
    {
      title: "Top Skorer & Statistik",
      desc: "Daftar pencetak gol terbanyak, assist, serta performa klub musim berjalan.",
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
            Sepak Bola
          </h1>
          <p className="mt-1 text-sm text-zinc-600 sm:text-base dark:text-zinc-400">
            Informasi lengkap liga sepak bola dunia, klasemen klub, jadwal tanding, dan update skor.
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
              Integrasi API resmi sepak bola
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
