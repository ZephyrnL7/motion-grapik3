# Jika Bumi Berhenti Berputar 5 Detik (Remotion, 1080x1920, 30 fps, 2700 frame)

- `npm install`, lalu `npm run dev` (pratinjau) dan `npm run render` (hasil: out/bumi-berhenti.mp4)
- Narasi: `public/narasi.mp3` (sekarang senyap sebagai pengganti)
- Timestamp kata: `src/captions.ts`; geser sinkron: `AUDIO_OFFSET` di `src/constants.ts`
- Durasi: `DURATION` di `src/constants.ts` (minimal 2129 frame = kata terakhir + 1 detik)
- Tata letak: `LAYOUT.md` dan `src/layout.ts`
- `npm run check` menjalankan pemeriksaan tipe TypeScript
