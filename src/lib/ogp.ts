import { parse } from "node-html-parser";

const REVALIDATE_SECONDS = 60 * 60 * 24; // 1 day

export const FAVICON_SIZE = 16;

export type Ogp = {
  title: string | undefined;
  description: string | undefined;
  image: string | undefined;
  isLargeImage: boolean;
  site: string | undefined;
  favicon: string | undefined;
};

export async function fetchOgp(urlString: string): Promise<Ogp> {
  const url = new URL(urlString);
  const html = await fetchSite(url);

  const root = parse(html);

  const title =
    root.querySelector('meta[property="og:title"]')?.getAttribute("content") ??
    root.querySelector("title")?.text;
  const description = (
    root.querySelector('meta[property="og:description"]') ??
    root.querySelector('meta[name="description"]')
  )?.getAttribute("content");
  const image = (
    root.querySelector('meta[property="og:image:secure_url"]') ??
    root.querySelector('meta[property="og:image:url"]') ??
    root.querySelector('meta[property="og:image"]')
  )?.getAttribute("content");
  const site =
    root
      .querySelector('meta[property="og:site_name"]')
      ?.getAttribute("content") ?? url.hostname;
  const isLargeImage =
    root.querySelector('meta[name="twitter:card"]')?.getAttribute("content") ===
    "summary_large_image";
  const favicon = new URL(
    (
      root.querySelector('link[rel="icon"][type="image/svg+xml"]') ??
      root.querySelector('link[rel="icon"][type="image/png"]') ??
      root.querySelector('link[rel="icon"]')
    )?.getAttribute("href") ?? "/favicon.ico",
    url,
  ).toString();

  return {
    title,
    description,
    image,
    isLargeImage,
    site,
    favicon,
  };
}

async function fetchSite(url: URL): Promise<string> {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "bot",
    },
    next: {
      revalidate: REVALIDATE_SECONDS,
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url.toString()}: ${response.status}`);
  }

  const text = await response.text();
  return text;
}
