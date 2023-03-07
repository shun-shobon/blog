import { ORIGIN } from "@/config";

export function createOgpImageUrl(title: string, tags?: string[]): string {
  const url = new URL("/ogp", ORIGIN);
  url.searchParams.set("title", title);
  if (tags) {
    url.searchParams.set("tags", tags.join(","));
  }

  return url.toString();
}
