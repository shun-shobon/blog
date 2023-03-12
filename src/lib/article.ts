import { ARTICLE_DATABASE_NAME } from "@/config";

import type { Article } from "./plugins";

export type ArticleDatabase = {
  tags: Map<string, Article[]>;
  articles: Map<string, Article>;
};

export type ArticleDatabaseSerialized = {
  tags: string[];
  articles: Article[];
};

export async function fetchArticleDatabase(): Promise<ArticleDatabase> {
  const serialized = (await import(
    `data/${ARTICLE_DATABASE_NAME}`
  )) as ArticleDatabaseSerialized;

  const tags = new Map<string, Article[]>(
    serialized.tags.map((tag) => [tag, []]),
  );
  const articles = new Map<string, Article>();

  serialized.articles.forEach((article) => {
    articles.set(article.slug, article);
    article.tags.forEach((tag) => {
      tags.get(tag)?.push(article);
    });
  });

  return { tags, articles };
}

export function getAllArticles(database: ArticleDatabase): Article[] {
  return Array.from(database.articles.values());
}

export function getArticle(
  database: ArticleDatabase,
  slug: string,
): Article | null {
  return database.articles.get(slug) ?? null;
}

export function getArticlesByTag(
  database: ArticleDatabase,
  tag: string,
): Article[] | null {
  return database.tags.get(tag) ?? null;
}
