import type { HTMLElement } from "node-html-parser";
import { parse } from "node-html-parser";

const REVALIDATE_SECONDS = 60 * 60 * 24; // 1 day

export const FAVICON_SIZE = 64;

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

  const ogpElements = root.querySelectorAll('meta[property^="og:"]');

  const title = findContent(ogpElements, "og:title");
  const description = findContent(ogpElements, "og:description");
  const image = findContent(ogpElements, "og:image");
  const site = findContent(ogpElements, "og:site_name");
  const isLargeImage =
    root.querySelector('meta[name="twitter:card"]')?.getAttribute("content") ===
    "summary_large_image";
  const favicon = createFavivonUrl(url);

  return {
    title,
    description,
    image,
    isLargeImage,
    site,
    favicon,
  };
}

function findContent(
  elements: HTMLElement[],
  property: string,
): string | undefined {
  return elements
    .find((e) => e.getAttribute("property") === property)
    ?.getAttribute("content");
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

const FAVICON_API = "https://www.google.com/s2/favicons";
export function createFavivonUrl(url: URL): string {
  const faviconUrl = new URL(FAVICON_API);
  faviconUrl.searchParams.set("domain_url", url.origin);
  faviconUrl.searchParams.set("sz", FAVICON_SIZE.toString());

  return faviconUrl.toString();
}
