<!-- @format -->

Konteks: Proyek Next.js + TypeScript + Tailwind baru. Baca AGENTS.md.
Ini dashboard informasi olahraga, bahasa Indonesia.

Tujuan: kerangka layout dan navigasi, belum ada data asli.

Tugas:

1. Bersihkan halaman bawaan create-next-app.
2. Buat navbar dengan tab: Beranda, Sepak Bola, F1, Basket.
   MotoGP belum perlu.
3. Buat halaman /, /sepak-bola, /f1, /basket. Tiap halaman
   berisi judul dan placeholder "Segera hadir".
4. Dukung tema gelap/terang (ikuti pengaturan sistem).
5. Layout responsif, nyaman di HP.
6. Buat komponen reusable: Card, LoadingSkeleton, ErrorMessage
   di /components.

Batasan: jangan tambah library. Jangan membuat panggilan API dulu.

Kriteria selesai: npm run dev jalan, semua tab bisa dibuka, tampilan
rapi di desktop dan HP, npm run build lulus.
