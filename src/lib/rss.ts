export interface RssItem {
  title: string;
  link: string;
  image: string;
  date: string;
}

function decodeXml(text: string): string {
  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

function stripHtml(html: string): string {
  return decodeXml(html).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function pickImage(block: string): string {
  const media = block.match(/<media:content[^>]+url=["']([^"']+)["']/i);
  if (media?.[1]) return decodeXml(media[1]);
  const enclosure = block.match(/<enclosure[^>]+url=["']([^"']+)["'][^>]*type=["']image/i);
  if (enclosure?.[1]) return decodeXml(enclosure[1]);
  const img = block.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (img?.[1]) return decodeXml(img[1]);
  return "";
}

function formatDate(raw: string): string {
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function parseRssXml(xml: string): RssItem[] {
  const items: RssItem[] = [];
  const chunks = xml.match(/<item[\s\S]*?<\/item>/gi) ?? [];
  for (const chunk of chunks) {
    const title = chunk.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "";
    const link = chunk.match(/<link[^>]*>([\s\S]*?)<\/link>/i)?.[1] ?? "";
    const pub = chunk.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i)?.[1] ?? "";
    const image = pickImage(chunk);
    const cleanTitle = stripHtml(title);
    const cleanLink = stripHtml(link);
    if (!cleanTitle || !cleanLink) continue;
    items.push({
      title: cleanTitle,
      link: cleanLink,
      image,
      date: formatDate(stripHtml(pub)),
    });
  }
  return items;
}

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`RSS fetch failed (${res.status})`);
  return res.text();
}

/** Dev uses Vite proxy; production falls back to allorigins. */
export async function loadRssFeed(feedPath: string): Promise<RssItem[]> {
  const absolute = feedPath.startsWith("http") ? feedPath : `https://rss.app/feeds/${feedPath}`;
  const file = absolute.split("/").pop() ?? "";
  const candidates = [
    `/api/rss/${file}`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(absolute)}`,
    absolute,
  ];

  let lastError: unknown;
  for (const url of candidates) {
    try {
      const xml = await fetchText(url);
      const items = parseRssXml(xml);
      if (items.length) return items;
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError instanceof Error ? lastError : new Error("Unable to load RSS feed");
}
