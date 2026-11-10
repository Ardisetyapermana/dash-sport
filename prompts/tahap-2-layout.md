<!-- @format -->

Konteks: Proyek Next.js + TypeScript + Tailwind. Tahap 1 selesai
(layout, navbar, komponen Card, LoadingSkeleton, ErrorMessage).
Baca AGENTS.md. Sekarang menambah data sepak bola dari
football-data.org (API v4, paket gratis).

Tujuan: halaman /sepak-bola menampilkan klasemen, jadwal/hasil,
dan top skorer dengan data nyata.

Batasan API (paket gratis):

- Hanya kompetisi yang tersedia di paket gratis. Baca dokumentasi
  resmi football-data.org untuk daftar kodenya, jangan menebak.
- 10 request per menit. Skor tertunda, BUKAN live.
- Tidak ada lineup, kartu, atau statistik pemain selain top skorer.

Tugas:

1. Di /lib/sports/football/ buat:
   - types.ts: tipe TypeScript untuk Standing, Match, Scorer.
   - client.ts: fungsi fetch server-side ke API dengan header
     X-Auth-Token dari process.env.FOOTBALL_DATA_API_KEY.
     Fungsi: getStandings(code), getMatches(code, opsi tanggal),
     getTopScorers(code).
   - competitions.ts: daftar kompetisi yang didukung (kode dan
     nama Indonesia) dan dipakai di UI.
2. Cache lewat fetch revalidate Next.js: klasemen 10 menit,
   jadwal/hasil 5 menit, top skorer 30 menit.
3. Tangani error: key tidak ada, 401/403, 429 (rate limit), data
   kosong. Tampilkan lewat komponen ErrorMessage dengan pesan
   bahasa Indonesia. Jangan crash dan jangan bocorkan API key.
4. Halaman /sepak-bola: pilihan liga lewat query param
   (?liga=PL), tab Klasemen / Jadwal & Hasil / Top Skorer.
   Gunakan Server Components. Tampilkan LoadingSkeleton via
   Suspense atau loading.tsx.
5. Tabel klasemen: posisi, tim, main, menang, seri, kalah, selisih
   gol, poin. Tabel harus bisa discroll horizontal di HP.
6. Tambahkan catatan kecil di halaman: "Data dari football-data.org,
   skor dapat tertunda."
7. Perbarui placeholder di Beranda untuk Sepak Bola (hapus badge
   "Segera hadir").

Batasan: jangan tambah library. API key hanya dipakai di server.
Jangan ubah halaman F1 dan Basket.

Kriteria selesai: npm run build lulus, klasemen dan jadwal
tampil dengan data nyata untuk minimal 2 liga, error API tampil
rapi, tampilan nyaman di HP.
