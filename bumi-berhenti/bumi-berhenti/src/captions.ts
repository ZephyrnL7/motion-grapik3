// Data SRT mentah (detik). Per frasa; pembagian per kata dihitung di timing.ts
// secara proporsional terhadap jumlah huruf.
export type Cue = {start: number; end: number; text: string};

export const CUES: Cue[] = [
  {start: 0.12, end: 6.0, text: 'Di khatulistiwa, kamu sedang melaju sekitar 1.600 km per jam. Sekarang,'},
  {start: 6.0, end: 11.2, text: 'bayangkan semuanya berhenti mendadak. Cuma lima detik. Bumi enggak ikut berhenti'},
  {start: 11.2, end: 17.32, text: 'bareng isinya. Tanah memang diam, tapi udara, laut, dan semua benda di permukaan'},
  {start: 17.32, end: 22.1, text: 'masih bergerak dengan kecepatan tadi. Mereka enggak dikasih tahu. Bayangin kamu'},
  {start: 22.1, end: 26.98, text: 'naik bus yang ngerem mendadak. Badanmu terlempar ke depan, kan? Nah, begitu juga'},
  {start: 26.98, end: 32.4, text: 'kita. Bedanya, busnya sebesar planet. Ambil Pontianak, tepat di garis'},
  {start: 32.4, end: 39.3, text: 'khatulistiwa. Kota itu bergerak sekitar 460 m per detik. Rumah, mobil, dan orang'},
  {start: 39.3, end: 44.0, text: 'di sana ikut terseret ke timur. Di Jakarta, kecepatannya sedikit lebih kecil,'},
  {start: 44.0, end: 48.88, text: 'tapi tetap kencang. Angin akan menyapu permukaan dengan kecepatan ratusan'},
  {start: 48.88, end: 54.18, text: 'kilometer per jam. Laut menghantam daratan sebagai gelombang raksasa. Bangunan'},
  {start: 54.18, end: 59.68, text: 'roboh, pohon tercabut, tanah pun bisa terkelupas. Lima detik cukup buat mengubah'},
  {start: 59.68, end: 64.92, text: 'wajah bumi. Untungnya, hal ini enggak mungkin terjadi. Selama ini kita tenang,'},
  {start: 64.92, end: 69.42, text: 'soalnya planet yang kita injak sedang berlari kencang dan kita enggak merasakan'},
  {start: 69.42, end: 69.96, text: 'apa-apa.'},
];
