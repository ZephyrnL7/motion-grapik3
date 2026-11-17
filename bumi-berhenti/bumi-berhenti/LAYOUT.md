# Tabel koordinat (x, y, lebar, tinggi) — kanvas 1080 x 1920

Margin aman 6% (65 px kiri/kanan, 115 px atas/bawah). Zona subtitle tetap: 65, 1459, 950, 346 (18% tinggi). Sumber kebenaran: `src/layout.ts`.

| Slot | Objek | Label (menempel di bawah objek) | Wadah gabungan |
|---|---|---|---|
| S1 | 90, 215, 900, 900 | 90, 1125, 900, 90 | 90, 215, 900, 1000 |
| S2 | 65, 215, 950, 860 | 65, 1085, 950, 90 | 65, 215, 950, 960 |
| S3 | 90, 215, 900, 900 | 90, 1125, 900, 90 | 90, 215, 900, 1000 |
| S4A | 65, 315, 550, 700 | 65, 1025, 550, 90 | 65, 315, 550, 800 |
| S4B | 705, 315, 310, 700 | 705, 1025, 310, 90 | 705, 315, 310, 800 |
| S5 | 65, 215, 950, 900 | 65, 1125, 950, 90 | 65, 215, 950, 1000 |
| S6E | 140, 215, 800, 800 | 140, 1025, 800, 90 | 140, 215, 800, 900 |
| S6B | 65, 215, 950, 860 | 65, 1085, 950, 90 | 65, 215, 950, 960 |
| T6 (judul penutup) | - | - | 65, 1095, 950, 240 |

## Momen yang tampil bersamaan

| Momen | Kotak | Hasil |
|---|---|---|
| B1 hook: bumi + label | (90, 215, 900, 1000) | tidak tumpang tindih |
| B2 masalah: penampang + label | (65, 215, 950, 960) | tidak tumpang tindih |
| B3 inti: bus -> bumi (satu wadah) | (90, 215, 900, 1000) | tidak tumpang tindih |
| B4 contoh: Pontianak + Jakarta | (65, 315, 550, 800) + (705, 315, 310, 800) | tidak tumpang tindih |
| B5 dampak: kota + label | (65, 215, 950, 1000) | tidak tumpang tindih |
| B6a penutup: bumi + label | (140, 215, 800, 900) | tidak tumpang tindih |
| B6b penutup: balkon + judul | (65, 215, 950, 860) + (65, 1095, 950, 240) | tidak tumpang tindih |

Pemeriksaan otomatis (checkLayout): 0 masalah.
B4: jarak horizontal Pontianak–Jakarta = 90 px (>= 8% = 86,4 px).
B3 dan B6 memakai satu wadah per objek (bus->bumi, bumi->balkon); objek berikutnya masuk setelah yang lama keluar.
Garis angin, jejak, bintang, dan garis seismograf adalah latar/efek, bukan objek.

