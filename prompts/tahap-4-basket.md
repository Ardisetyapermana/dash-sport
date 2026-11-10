<!-- @format -->

Konteks: Proyek Next.js 16 + TypeScript + Tailwind. Tahap 1-3
selesai (layout, sepak bola, F1). Baca AGENTS.md dan ikuti pola
modul di /lib/sports/football/ dan /lib/sports/f1/ sebagai acuan
struktur dan gaya kode. Sekarang menambah data basket NBA dari
API Ninjas (Basketball API).

Tujuan: halaman /basket menampilkan klasemen dan jadwal/skor NBA
dengan data nyata.

Sumber data:

- Base URL: https://api.api-ninjas.com/v1
- Header: X-Api-Key dari process.env.API_NINJAS_KEY (server-side saja)
- Endpoint: /basketballgames?league=nba dan
  /basketballstandings?league=nba
- Season dipakai sebagai tahun mulai: season=2026 adalah musim
  2026-27 (musim berjalan sekarang).
- Verifikasi parameter, filter tanggal, dan bentuk respons ke
  dokumentasi resmi api-ninjas.com/api/basketball sebelum menulis
  kode. Jangan menebak.

Batasan API (paket gratis):

- Hanya musim berjalan. Skor live (kuarter, jam) TIDAK tersedia;
  yang ada skor akhir. Jangan beri label "LIVE".
- Cari tahu batas request di dokumentasi dan tangani 429.

Tugas:

1. Di /lib/sports/basketball/ buat:
   - types.ts: tipe StandingRow dan Game.
   - client.ts: fetch server-side, fungsi getStandings dan
     getGames (dengan opsi tanggal bila API mendukung). Satu
     helper fetch bersama untuk penanganan error.
2. Cache lewat fetch revalidate: klasemen 30 menit, jadwal/skor
   10 menit.
3. Tangani error: key tidak ada, 401/403, 429, data kosong.
   Tampilkan lewat ErrorMessage berbahasa Indonesia. Jangan crash
   dan jangan bocorkan API key.
4. Halaman /basket dengan tab lewat query param
   (?tab=klasemen|jadwal), Server Components, dan loading
   skeleton seperti halaman lain.
5. Klasemen: kelompokkan per wilayah (Timur/Barat) bila datanya
   ada. Kolom: posisi, tim, menang, kalah, persentase menang,
   dan seed playoff bila tersedia. Scroll horizontal di HP.
6. Jadwal & skor: kelompokkan per tanggal, tampilkan tim tamu
   dan tuan rumah, skor akhir, status, dan jam mulai dalam WIB.
   Tandai pertandingan yang sudah selesai dan yang akan datang.
7. Catatan kecil di halaman: "Data dari API Ninjas. Skor akhir,
   tanpa update live."
8. Perbarui kartu Basket di Beranda (hapus badge "Segera hadir").

Aturan Next.js 16: jangan pakai new Date(), Date.now(), atau
Math.random() langsung di Server Component. Pakai
`await connection()` lalu bungkus komponennya dengan <Suspense>,
atau hitung di Client Component.

Batasan: jangan tambah library. Jangan ubah halaman Sepak Bola
dan F1 kecuali komponen bersama yang memang perlu.

Kriteria selesai: npm run build dan npm run lint lulus, kedua
tab menampilkan data nyata atau pesan kosong yang rapi, tidak ada
error new Date() di dev server, tampilan nyaman di HP.
