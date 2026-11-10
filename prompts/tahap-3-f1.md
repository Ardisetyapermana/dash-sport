<!-- @format -->

Konteks: Proyek Next.js + TypeScript + Tailwind. Tahap 1 (layout)
dan tahap 2 (sepak bola) selesai. Baca AGENTS.md dan ikuti pola
modul di /lib/sports/football/ sebagai acuan struktur dan gaya kode.
Sekarang menambah data Formula 1 dari Jolpica-F1 (penerus Ergast).

Tujuan: halaman /f1 menampilkan klasemen, kalender, dan hasil
balapan dengan data nyata.

Sumber data:

- Base URL: https://api.jolpi.ca/ergast/f1
- Tanpa API key. Format Ergast: tambahkan .json di akhir path.
- Verifikasi path endpoint dan bentuk responsnya ke dokumentasi
  resmi Jolpica/Ergast sebelum menulis kode. Jangan menebak.
- Endpoint yang dibutuhkan: klasemen pembalap, klasemen konstruktor,
  kalender musim berjalan, hasil balapan terakhir.
  Pakai "current" untuk musim berjalan.

Batasan API:

- Batas pemakaian tanpa autentikasi: sekitar 4 request/detik
  (burst) dan 500 request/jam. Aturan bisa berubah, jadi
  tangani status 429 dengan baik.
- Data diperbarui setelah balapan selesai, bukan real-time.

Tugas:

1. Di /lib/sports/f1/ buat:
   - types.ts: tipe untuk DriverStanding, ConstructorStanding,
     Race (kalender), RaceResult.
   - client.ts: fetch server-side dengan fungsi getDriverStandings,
     getConstructorStandings, getSchedule, getLastRaceResults.
     Satu helper fetch bersama untuk penanganan error.
2. Cache lewat fetch revalidate Next.js: klasemen 1 jam, kalender
   6 jam, hasil balapan terakhir 1 jam.
3. Tangani error: 429, jaringan gagal, data kosong (misalnya
   di luar musim balap, atau antar-musim). Tampilkan lewat
   ErrorMessage dengan pesan bahasa Indonesia. Jangan crash.
4. Halaman /f1 dengan tab lewat query param
   (?tab=pembalap|konstruktor|kalender|hasil), Server Components,
   dan loading skeleton seperti di halaman sepak bola.
5. Tabel klasemen pembalap: posisi, pembalap, tim, poin, menang.
   Konstruktor: posisi, tim, poin, menang. Bisa discroll
   horizontal di HP.
6. Kalender: nama GP, sirkuit, negara, tanggal dan jam
   (zona waktu WIB), tandai balapan yang sudah selesai dan
   balapan berikutnya.
7. Hasil balapan terakhir: posisi, pembalap, tim, grid awal,
   waktu atau status, poin.
8. Catatan kecil di halaman: "Data dari Jolpica-F1, diperbarui
   setelah balapan selesai."
9. Perbarui kartu F1 di Beranda (hapus badge "Segera hadir").

Batasan: jangan tambah library. Jangan ubah halaman Sepak Bola
dan Basket kecuali komponen bersama yang memang perlu.

Kriteria selesai: npm run build dan npm run lint lulus, keempat
tab menampilkan data nyata atau pesan kosong yang rapi, tampilan
nyaman di HP.
