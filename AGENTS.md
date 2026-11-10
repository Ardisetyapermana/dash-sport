<!-- @format -->

# Sports Dashboard

Dashboard informasi olahraga (sepak bola, F1, basket; MotoGP
menyusul). Antarmuka berbahasa Indonesia.

## Stack

Next.js (App Router), TypeScript, Tailwind.

## Aturan utama

- Semua data berasal dari API resmi atau publik, tidak boleh
  dikarang atau di-hardcode.
- Fetch data di server (Server Components / route handler).
  API key tidak boleh sampai ke browser.
- Gunakan cache dan revalidate Next.js agar tidak melewati rate
  limit API.
- Tangani loading dan error dengan tampilan yang jelas.

## Struktur

- Tiap olahraga modular di /lib/sports/<nama>/ (client.ts untuk
  memanggil API, types.ts untuk tipe data).
- Komponen UI di /components. Halaman di /app/<olahraga>/page.tsx.
- Menambah olahraga baru = menambah folder dan satu halaman,
  tanpa mengubah olahraga lain.

## Konvensi

- TypeScript strict, hindari `any`.
- Secret hanya di .env.local; selalu update .env.example.
- Jangan tambah library tanpa alasan jelas.
- Jangan sentuh file di luar lingkup tugas.
- Setelah perubahan, pastikan `npm run build` lulus.

- Next.js 16: jangan memakai new Date(), Date.now(), atau Math.random()
  langsung di Server Component. Pakai `await connection()` lalu
  bungkus komponennya dengan <Suspense>, atau hitung di Client
  Component.
