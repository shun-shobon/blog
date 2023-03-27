import { ARTICLE_DATABASE_NAME } from "@/config";

import type { Article } from "./plugins";

export interface ArticleDatabase {
  tags: Map<string, Array<Article>>;
  articles: Map<string, Article>;
}

export interface ArticleDatabaseSerialized {
  tags: Array<string>;
  articles: Array<Article>;
}

export async function fetchArticleDatabase(): Promise<ArticleDatabase> {
  const serialized = (await import(
    `data/${ARTICLE_DATABASE_NAME}`
  )) as ArticleDatabaseSerialized;

  const tags = new Map<string, Array<Article>>(
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

export function getAllArticles(database: ArticleDatabase): Array<Article> {
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
): Array<Article> | null {
  return database.tags.get(tag) ?? null;
}
