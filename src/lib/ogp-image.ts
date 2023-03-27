import { ORIGIN } from "@/config";

export function createOgpImageUrl(
  title?: string,
  emoji?: string,
  tags?: Array<string>,
): URL {
  const url = new URL("/ogp", ORIGIN);
  if (title != null) {
    url.searchParams.set("title", title);
  }
  if (emoji != null) {
    url.searchParams.set("emoji", emoji);
  }
  if (tags) {
    url.searchParams.set("tags", tags.join(","));
  }

  return url;
}
