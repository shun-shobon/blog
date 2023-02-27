import type { ArticleSummaries, ArticleSummary } from "@/lib/markdown";
import { ARTICLE_SUMMARIES_FILE_NAME } from "@/lib/markdown";

import type { Article } from "./plugins";

export async function getAllArticleSummaries(): Promise<ArticleSummary[]> {
  return (
    (await import(`data/${ARTICLE_SUMMARIES_FILE_NAME}`)) as ArticleSummaries
  ).summaries;
}

export async function getArticleSummariesByTag(
  tag: string,
): Promise<ArticleSummary[]> {
  const summaries = await getAllArticleSummaries();

  return summaries.filter((summary) => summary.tags.includes(tag));
}

export async function getAllTags(): Promise<string[]> {
  const summaries = await getAllArticleSummaries();

  const tags = new Set<string>();
  summaries.forEach((summary) => summary.tags.forEach((tag) => tags.add(tag)));

  return Array.from(tags);
}

export async function getArticle(slug: string): Promise<Article> {
  return (await import(`data/${slug}.json`)) as Article;
}
