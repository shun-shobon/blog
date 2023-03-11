import { ARTICLE_REPOSITORY_EDIT_PATH, ORIGIN } from "@/config";

export class UnreachableError extends Error {
  constructor() {
    super();

    this.name = "UnreachableError";
  }
}

export function joinPath(...paths: string[]): string {
  return paths.join("/").replace(/\/+/g, "/").replace(/\.\//, "");
}

export function getUrl(...paths: string[]): URL {
  return new URL(joinPath(...paths), ORIGIN);
}

export function getArticleUrl(slug: string): URL {
  return getUrl("/articles", slug);
}

export function getTagUrl(name: string): URL {
  return getUrl("/tags", name);
}

export function getEditArticleUrl(slug: string): URL {
  return new URL(
    joinPath(ARTICLE_REPOSITORY_EDIT_PATH, slug, "README.md"),
    "https://github.com",
  );
}

export function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}
