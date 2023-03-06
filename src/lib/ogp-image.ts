import { ORIGIN } from "@/config";

export function createOgpImageUrl(title: string, tags?: string[]): string {
  const url = new URL("/api/ogp", ORIGIN);
  url.searchParams.set("title", title);
  if (tags) {
    url.searchParams.set("tagas", tags.join(","));
  }

  return url.toString();
}
