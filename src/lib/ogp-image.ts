import { ORIGIN } from "@/config";

export function createOgpImageUrl(title: string, date?: string): string {
  const url = new URL("/api/ogp", ORIGIN);
  url.searchParams.set("title", title);
  if (date) {
    url.searchParams.set("date", date);
  }

  return url.toString();
}
