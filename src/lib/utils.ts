import { ORIGIN } from "@/config";

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
