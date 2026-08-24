export interface Video {
  id: string;
  name: string;
  videoPath: string;
  category: string;
  thumbnail: string;
  orientation: "portrait" | "landscape";
}

/** Placeholder SVG poster until real thumbnails / video APIs are wired in */
function poster(id: string, title: string, hue: number, orientation: "portrait" | "landscape"): string {
  const safe = title.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const w = orientation === "landscape" ? 960 : 640;
  const h = orientation === "landscape" ? 540 : 960;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="hsl(${hue},55%,18%)"/>
        <stop offset="100%" stop-color="hsl(${hue + 20},45%,8%)"/>
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#g)"/>
    <rect x="20" y="20" width="${w - 40}" height="${h - 40}" rx="14" fill="none" stroke="hsla(42,70%,55%,0.35)" stroke-width="2"/>
    <text x="${w / 2}" y="${h / 2 - 8}" text-anchor="middle" fill="hsla(42,80%,70%,0.9)" font-family="Georgia,serif" font-size="${orientation === "landscape" ? 32 : 28}" font-weight="700">${safe}</text>
    <text x="${w / 2}" y="${h / 2 + 28}" text-anchor="middle" fill="hsla(0,0%,100%,0.35)" font-family="Arial,sans-serif" font-size="16">Bangla Plus · #${id}</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/**
 * Section 1 — Featured Originals: 10 portrait
 * Section 2 — Romance & Drama:    10 landscape
 * Section 3 — Family Stories:      6 portrait
 * Section 4 — Mystery & Crime:    10 landscape
 * Section 5 — Comedy & Light:      6 landscape
 */
export const VIDEOS: Video[] = [
  // Featured Originals — 10 portrait
  { id: "1",  name: "Fatal Attraction",   category: "Featured Originals", orientation: "portrait", thumbnail: "/portrait/21.jpg",  videoPath: "https://vz-9792d196-9fb.b-cdn.net/c76f0458-c1b5-4f11-83c1-a87849f3f03d/play_480p.mp4" },
  { id: "2",  name: "Dirty Picture",      category: "Featured Originals", orientation: "portrait", thumbnail: "/portrait/22.jpg",  videoPath: "https://vz-9792d196-9fb.b-cdn.net/cc4dad62-c7f2-40d2-87f5-7fad81575d8d/play_480p.mp4" },
  { id: "3",  name: "Ek Din Ratre",       category: "Featured Originals", orientation: "portrait", thumbnail: "/portrait/23.jpg",  videoPath: "https://vz-9792d196-9fb.b-cdn.net/f5b4472a-fa6c-40de-88cc-863122d736c2/play_480p.mp4" },
  { id: "4",  name: "Delivery Boy",       category: "Featured Originals", orientation: "portrait", thumbnail: "/portrait/24.jpg",  videoPath: "https://vz-9792d196-9fb.b-cdn.net/ab24364f-21e5-4f2b-affa-aa94127bed83/play_480p.mp4" },
  { id: "5",  name: "Dark",               category: "Featured Originals", orientation: "portrait", thumbnail: "/portrait/25.jpg",  videoPath: "https://vz-9792d196-9fb.b-cdn.net/1ad61557-0bf4-4276-99df-2b54464a6f9e/play_480p.mp4" },
  { id: "6",  name: "Dark Lane Ep 8",     category: "Featured Originals", orientation: "portrait", thumbnail: "/portrait/26.jpg",  videoPath: "https://vz-9792d196-9fb.b-cdn.net/cdfa2cb9-b45a-4f06-9958-96c8b0b775a6/play_480p.mp4" },
  { id: "7",  name: "Dark Night Original",category: "Featured Originals", orientation: "portrait", thumbnail: "/portrait/27.jpg",  videoPath: "https://vz-9792d196-9fb.b-cdn.net/faea2e5f-d7d0-4242-9e87-9991e7c0a92c/play_480p.mp4" },
  { id: "8",  name: "Dark Lane Ep 6",     category: "Featured Originals", orientation: "portrait", thumbnail: "/portrait/28.jpg",  videoPath: "https://vz-9792d196-9fb.b-cdn.net/ff395a84-193a-4df9-aeb1-d5647a08daad/play_480p.mp4" },
  { id: "9",  name: "Dark Lane Ep 7",     category: "Featured Originals", orientation: "portrait", thumbnail: "/portrait/29.jpg",  videoPath: "https://vz-9792d196-9fb.b-cdn.net/ff3620d0-32d3-48ba-bd16-361e6fe1894b/play_480p.mp4" },
  { id: "10", name: "Dark Lane Ep 5",     category: "Featured Originals", orientation: "portrait", thumbnail: "/portrait/30.jpg",  videoPath: "https://vz-9792d196-9fb.b-cdn.net/9c29ca9e-e006-4fc7-807b-327c2f655326/play_480p.mp4" },

  // Romance & Drama — 10 landscape
  { id: "11", name: "Bhoot",              category: "Romance & Drama",    orientation: "landscape", thumbnail: "/landscape/1.jpg",  videoPath: "https://vz-9792d196-9fb.b-cdn.net/aca7e3ef-c97c-400c-8019-95d5611625dd/play_480p.mp4" },
  { id: "12", name: "Bhed",               category: "Romance & Drama",    orientation: "landscape", thumbnail: "/landscape/2.jpg",  videoPath: "https://vz-9792d196-9fb.b-cdn.net/b76f586c-3117-48b9-b88f-94fd4c991866/play_480p.mp4" },
  { id: "13", name: "Bhalobashi 2",       category: "Romance & Drama",    orientation: "landscape", thumbnail: "/landscape/3.jpg",  videoPath: "https://vz-9792d196-9fb.b-cdn.net/735d7761-4ff8-44f9-ad8e-6e35237c7b1e/play_480p.mp4" },
  { id: "14", name: "Bhalobasha",         category: "Romance & Drama",    orientation: "landscape", thumbnail: "/landscape/4.jpg",  videoPath: "https://vz-9792d196-9fb.b-cdn.net/e4f6bd0f-6917-41ed-ad8b-fd479ee08b91/play_480p.mp4" },
  { id: "15", name: "Basona",             category: "Romance & Drama",    orientation: "landscape", thumbnail: "/landscape/5.jpg",  videoPath: "https://vz-9792d196-9fb.b-cdn.net/88017f88-f855-4677-9030-2fcd5d840c32/play_480p.mp4" },
  { id: "16", name: "Bad Audition",       category: "Romance & Drama",    orientation: "landscape", thumbnail: "/landscape/6.jpg",  videoPath: "https://vz-9792d196-9fb.b-cdn.net/442827d0-32a8-4eb1-801d-9a7eedda8d26/play_480p.mp4" },
  { id: "17", name: "Ankhee",             category: "Romance & Drama",    orientation: "landscape", thumbnail: "/landscape/7.jpg",  videoPath: "https://vz-9792d196-9fb.b-cdn.net/a43179f5-4360-4fed-a69f-3c1e3a5dcd1a/play_480p.mp4" },
  { id: "18", name: "Ami Tomake Chai",    category: "Romance & Drama",    orientation: "landscape", thumbnail: "/landscape/8.jpg",  videoPath: "https://vz-9792d196-9fb.b-cdn.net/ac28324d-6eb2-4844-affd-95eb63049fdf/play_480p.mp4" },
  { id: "19", name: "An Unforgettable Week", category: "Romance & Drama", orientation: "landscape", thumbnail: "/landscape/9.jpg",  videoPath: "https://vz-9792d196-9fb.b-cdn.net/689cbcd0-38af-4435-af25-029422bf015f/play_480p.mp4" },
  { id: "20", name: "Affair",             category: "Romance & Drama",    orientation: "landscape", thumbnail: "/landscape/10.jpg", videoPath: "https://vz-9792d196-9fb.b-cdn.net/1aca05ad-b370-4fdd-8b54-81a7dde5ba1e/play_480p.mp4" },

  // Family Stories — 6 portrait
  { id: "21", name: "Dark Lane Ep 4",  category: "Family Stories", orientation: "portrait", thumbnail: "/portrait/31.jpg", videoPath: "https://vz-9792d196-9fb.b-cdn.net/073d2af2-9b61-49ff-8d6f-3fc2159a6561/play_480p.mp4" },
  { id: "22", name: "Dark Lane Ep 3",  category: "Family Stories", orientation: "portrait", thumbnail: "/portrait/32.jpg", videoPath: "https://vz-9792d196-9fb.b-cdn.net/31b11bfa-2dd2-424f-b67e-80b5a07a6e74/play_480p.mp4" },
  { id: "23", name: "Dark Lane Ep 2",  category: "Family Stories", orientation: "portrait", thumbnail: "/portrait/33.jpg", videoPath: "https://vz-9792d196-9fb.b-cdn.net/6c91d4a9-0337-4cd2-a435-1cbaff45bc0f/play_480p.mp4" },
  { id: "24", name: "Chemistry Maam",  category: "Family Stories", orientation: "portrait", thumbnail: "/portrait/34.jpg", videoPath: "https://vz-9792d196-9fb.b-cdn.net/d133b672-e699-4758-b178-26f32ef6692f/play_480p.mp4" },
  { id: "25", name: "Charam Sukh",     category: "Family Stories", orientation: "portrait", thumbnail: "/portrait/35.jpg", videoPath: "https://vz-9792d196-9fb.b-cdn.net/446af984-63c1-4a31-903b-a8da356ad5c5/play_480p.mp4" },
  { id: "26", name: "Changing Room",   category: "Family Stories", orientation: "portrait", thumbnail: "/portrait/36.jpg", videoPath: "https://vz-9792d196-9fb.b-cdn.net/88ac6cd8-54c6-4a75-9c8a-a6964cf66c61/play_480p.mp4" },

  // Mystery & Crime — 10 landscape
  { id: "27", name: "Golden Game",        category: "Mystery & Crime",    orientation: "landscape", thumbnail: "/landscape/21.jpg", videoPath: "https://vz-9792d196-9fb.b-cdn.net/1e53617d-047b-4a72-a42d-7fd0adbe9dbd/play_480p.mp4" },
  { id: "28", name: "Gandu",              category: "Mystery & Crime",    orientation: "landscape", thumbnail: "/landscape/22.jpg", videoPath: "https://vz-9792d196-9fb.b-cdn.net/ea82c2a8-a850-4115-a307-d3304c91f42b/play_480p.mp4" },
  { id: "29", name: "G-13",               category: "Mystery & Crime",    orientation: "landscape", thumbnail: "/landscape/23.jpg", videoPath: "https://vz-9792d196-9fb.b-cdn.net/2d882fce-50f2-4f51-9368-89d21329a183/play_480p.mp4" },
  { id: "30", name: "First Time",         category: "Mystery & Crime",    orientation: "landscape", thumbnail: "/landscape/24.jpg", videoPath: "https://vz-9792d196-9fb.b-cdn.net/0289d77e-d117-47b5-8ccc-6e147364acec/play_480p.mp4" },
  { id: "31", name: "Dark Lane Ep 4",     category: "Mystery & Crime",    orientation: "landscape", thumbnail: "/landscape/25.jpg", videoPath: "https://vz-9792d196-9fb.b-cdn.net/073d2af2-9b61-49ff-8d6f-3fc2159a6561/play_480p.mp4" },
  { id: "32", name: "Dark Lane Ep 3",     category: "Mystery & Crime",    orientation: "landscape", thumbnail: "/landscape/26.jpg", videoPath: "https://vz-9792d196-9fb.b-cdn.net/31b11bfa-2dd2-424f-b67e-80b5a07a6e74/play_480p.mp4" },
  { id: "33", name: "Dark Lane Ep 2",     category: "Mystery & Crime",    orientation: "landscape", thumbnail: "/landscape/27.jpg", videoPath: "https://vz-9792d196-9fb.b-cdn.net/6c91d4a9-0337-4cd2-a435-1cbaff45bc0f/play_480p.mp4" },
  { id: "34", name: "Chemistry Maam",     category: "Mystery & Crime",    orientation: "landscape", thumbnail: "/landscape/28.jpg", videoPath: "https://vz-9792d196-9fb.b-cdn.net/d133b672-e699-4758-b178-26f32ef6692f/play_480p.mp4" },
  { id: "35", name: "Charam Sukh",        category: "Mystery & Crime",    orientation: "landscape", thumbnail: "/landscape/29.jpg", videoPath: "https://vz-9792d196-9fb.b-cdn.net/446af984-63c1-4a31-903b-a8da356ad5c5/play_480p.mp4" },
  { id: "36", name: "Changing Room",      category: "Mystery & Crime",    orientation: "landscape", thumbnail: "/landscape/30.jpg", videoPath: "https://vz-9792d196-9fb.b-cdn.net/88ac6cd8-54c6-4a75-9c8a-a6964cf66c61/play_480p.mp4" },

  // Comedy & Light — 6 landscape
  { id: "37", name: "Challenge",       category: "Comedy & Light", orientation: "landscape", thumbnail: "/landscape/37.jpg", videoPath: "https://vz-9792d196-9fb.b-cdn.net/e3650a5a-df8d-4f49-8811-acb6baf441cd/play_480p.mp4" },
  { id: "38", name: "Chaka",           category: "Comedy & Light", orientation: "landscape", thumbnail: "/landscape/38.jpg", videoPath: "https://vz-9792d196-9fb.b-cdn.net/ade94190-c1fe-41a3-b6f6-cec3cf5b52d5/play_480p.mp4" },
  { id: "39", name: "Call Girl Story", category: "Comedy & Light", orientation: "landscape", thumbnail: "/landscape/39.jpg", videoPath: "https://vz-9792d196-9fb.b-cdn.net/58a8952a-64b0-427a-8bfe-bb52704beea8/play_480p.mp4" },
  { id: "40", name: "Chaalbaaz",       category: "Comedy & Light", orientation: "landscape", thumbnail: "/landscape/40.jpg", videoPath: "https://vz-9792d196-9fb.b-cdn.net/ed15ecf5-4140-4619-aa1a-3c62f253742c/play_480p.mp4" },
  { id: "41", name: "Birthday",        category: "Comedy & Light", orientation: "landscape", thumbnail: "/landscape/41.jpg", videoPath: "https://vz-9792d196-9fb.b-cdn.net/98626395-8446-4d34-b006-664b1d90993d/play_480p.mp4" },
  { id: "42", name: "Bhoy",            category: "Comedy & Light", orientation: "landscape", thumbnail: "/landscape/42.jpg", videoPath: "https://vz-9792d196-9fb.b-cdn.net/69272c90-ac70-47bb-8cd8-c05c5cce64eb/play_480p.mp4" },
];

/** Top 10 — portrait 1080×1350 */
export const TOP10: Video[] = [
  { id: "t1",  name: "ভূত",                  category: "Featured Originals", orientation: "portrait", thumbnail: "/portrait/1.jpg",  videoPath: "https://vz-9792d196-9fb.b-cdn.net/aca7e3ef-c97c-400c-8019-95d5611625dd/play_480p.mp4" },
  { id: "t2",  name: "ভেদ",                  category: "Featured Originals", orientation: "portrait", thumbnail: "/portrait/2.jpg",  videoPath: "https://vz-9792d196-9fb.b-cdn.net/b76f586c-3117-48b9-b88f-94fd4c991866/play_480p.mp4" },
  { id: "t3",  name: "ভালোবাসি ২",           category: "Featured Originals", orientation: "portrait", thumbnail: "/portrait/3.jpg",  videoPath: "https://vz-9792d196-9fb.b-cdn.net/735d7761-4ff8-44f9-ad8e-6e35237c7b1e/play_480p.mp4" },
  { id: "t4",  name: "ভালোবাসা",             category: "Featured Originals", orientation: "portrait", thumbnail: "/portrait/4.jpg",  videoPath: "https://vz-9792d196-9fb.b-cdn.net/e4f6bd0f-6917-41ed-ad8b-fd479ee08b91/play_480p.mp4" },
  { id: "t5",  name: "বাসনা",                category: "Featured Originals", orientation: "portrait", thumbnail: "/portrait/5.jpg",  videoPath: "https://vz-9792d196-9fb.b-cdn.net/88017f88-f855-4677-9030-2fcd5d840c32/play_480p.mp4" },
  { id: "t6",  name: "Bad Audition",         category: "Featured Originals", orientation: "portrait", thumbnail: "/portrait/6.jpg",  videoPath: "https://vz-9792d196-9fb.b-cdn.net/442827d0-32a8-4eb1-801d-9a7eedda8d26/play_480p.mp4" },
  { id: "t7",  name: "Ankhee",               category: "Romance & Drama",    orientation: "portrait", thumbnail: "/portrait/7.jpg",  videoPath: "https://vz-9792d196-9fb.b-cdn.net/a43179f5-4360-4fed-a69f-3c1e3a5dcd1a/play_480p.mp4" },
  { id: "t8",  name: "April Fool",           category: "Comedy & Light",     orientation: "portrait", thumbnail: "/portrait/8.jpg",  videoPath: "https://vz-9792d196-9fb.b-cdn.net/1d7feefb-f829-4668-b846-d2da02239f1d/play_480p.mp4" },
  { id: "t9",  name: "আমি তোমাকে চাই",       category: "Romance & Drama",    orientation: "portrait", thumbnail: "/portrait/9.jpg",  videoPath: "https://vz-9792d196-9fb.b-cdn.net/ac28324d-6eb2-4844-affd-95eb63049fdf/play_480p.mp4" },
  { id: "t10", name: "An Unforgettable Week", category: "Romance & Drama",   orientation: "portrait", thumbnail: "/portrait/10.jpg", videoPath: "https://vz-9792d196-9fb.b-cdn.net/689cbcd0-38af-4435-af25-029422bf015f/play_480p.mp4" },
];

/** Trending Now — landscape 1350×760 */
export const TRENDING: Video[] = [
  { id: "tr1", name: "After 7 Years", category: "Romance & Drama", orientation: "landscape", thumbnail: "/landscape/13.jpg", videoPath: "https://vz-9792d196-9fb.b-cdn.net/3f7c918b-88e5-41e9-8752-cd30128f3137/play_480p.mp4" },
  { id: "tr2", name: "Kidnap",        category: "Mystery & Crime", orientation: "landscape", thumbnail: "/landscape/14.jpg", videoPath: "https://vz-9792d196-9fb.b-cdn.net/1add3781-5ea3-43d9-8769-de29078062fb/play_480p.mp4" },
  { id: "tr3", name: "99 Not Out",    category: "Comedy & Light",  orientation: "landscape", thumbnail: "/landscape/15.jpg", videoPath: "https://vz-9792d196-9fb.b-cdn.net/b76337a8-b49b-49cd-9288-0e3268ea3cc5/play_480p.mp4" },
  { id: "tr4", name: "Honey Trap",    category: "Mystery & Crime", orientation: "landscape", thumbnail: "/landscape/16.jpg", videoPath: "https://vz-9792d196-9fb.b-cdn.net/e6b596d7-db5c-4519-be36-cf97d2f172af/play_480p.mp4" },
  { id: "tr5", name: "Golden Game",   category: "Mystery & Crime", orientation: "landscape", thumbnail: "/landscape/17.jpg", videoPath: "https://vz-9792d196-9fb.b-cdn.net/1e53617d-047b-4a72-a42d-7fd0adbe9dbd/play_480p.mp4" },
];

/** All Time Popular — landscape 1350×760 */
export const POPULAR_LANDSCAPE: Video[] = [
  { id: "p1",  name: "Affair",           category: "Romance & Drama",  orientation: "landscape", thumbnail: "/landscape/11.jpg", videoPath: "https://vz-9792d196-9fb.b-cdn.net/1aca05ad-b370-4fdd-8b54-81a7dde5ba1e/play_480p.mp4" },
  { id: "p2",  name: "Agnisakshi",       category: "Mystery & Crime",  orientation: "landscape", thumbnail: "/landscape/12.jpg", videoPath: "https://vz-9792d196-9fb.b-cdn.net/6f24ec5f-5db3-421f-a7c7-5b4f4a8b1f28/play_480p.mp4" },
  { id: "p3",  name: "After 7 Years",    category: "Romance & Drama",  orientation: "landscape", thumbnail: "/landscape/13.jpg", videoPath: "https://vz-9792d196-9fb.b-cdn.net/3f7c918b-88e5-41e9-8752-cd30128f3137/play_480p.mp4" },
  { id: "p4",  name: "Kidnap",           category: "Mystery & Crime",  orientation: "landscape", thumbnail: "/landscape/14.jpg", videoPath: "https://vz-9792d196-9fb.b-cdn.net/1add3781-5ea3-43d9-8769-de29078062fb/play_480p.mp4" },
  { id: "p5",  name: "99 Not Out",       category: "Comedy & Light",   orientation: "landscape", thumbnail: "/landscape/15.jpg", videoPath: "https://vz-9792d196-9fb.b-cdn.net/b76337a8-b49b-49cd-9288-0e3268ea3cc5/play_480p.mp4" },
  { id: "p6",  name: "Honey Trap",       category: "Mystery & Crime",  orientation: "landscape", thumbnail: "/landscape/16.jpg", videoPath: "https://vz-9792d196-9fb.b-cdn.net/e6b596d7-db5c-4519-be36-cf97d2f172af/play_480p.mp4" },
  { id: "p7",  name: "Golden Game",      category: "Mystery & Crime",  orientation: "landscape", thumbnail: "/landscape/17.jpg", videoPath: "https://vz-9792d196-9fb.b-cdn.net/1e53617d-047b-4a72-a42d-7fd0adbe9dbd/play_480p.mp4" },
  { id: "p8",  name: "Gandu",            category: "Comedy & Light",   orientation: "landscape", thumbnail: "/landscape/18.jpg", videoPath: "https://vz-9792d196-9fb.b-cdn.net/ea82c2a8-a850-4115-a307-d3304c91f42b/play_480p.mp4" },
  { id: "p9",  name: "G-13",             category: "Mystery & Crime",  orientation: "landscape", thumbnail: "/landscape/19.jpg", videoPath: "https://vz-9792d196-9fb.b-cdn.net/2d882fce-50f2-4f51-9368-89d21329a183/play_480p.mp4" },
  { id: "p10", name: "First Time",       category: "Romance & Drama",  orientation: "landscape", thumbnail: "/landscape/20.jpg", videoPath: "https://vz-9792d196-9fb.b-cdn.net/0289d77e-d117-47b5-8ccc-6e147364acec/play_480p.mp4" },
];

export function findVideoById(id: string): Video | undefined {
  return [...VIDEOS, ...TOP10, ...TRENDING, ...POPULAR_LANDSCAPE].find((item) => item.id === id);
}

export function getAllCategories(): string[] {
  return ["Featured Originals", "Family Stories", "Comedy & Light"];
}

export function getVideosByCategory(category: string): Video[] {
  return VIDEOS.filter((item) => item.category === category);
}
