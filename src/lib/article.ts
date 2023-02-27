import type { ArticleSummaries, ArticleSummary } from "@/lib/markdown";

import type { Article } from "./plugins";

export async function getArticleSummaries(): Promise<ArticleSummary[]> {
  return ((await import("data/__summaries__.json")) as ArticleSummaries)
    .summaries;
}

export async function getArticle(slug: string): Promise<Article> {
  return (await import(`data/${slug}.json`)) as Article;
}
