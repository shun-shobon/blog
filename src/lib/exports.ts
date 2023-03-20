import * as fs from "node:fs/promises";
import * as path from "node:path";

import { Temporal } from "@js-temporal/polyfill";
import fg from "fast-glob";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import { unified } from "unified";

import { ARTICLE_DATABASE_NAME } from "@/config";

import type { ArticleDatabaseSerialized } from "./article";
import type { Article, ArticlePath } from "./plugins";
import {
  MARKDOWN_FILENAME,
  remarkArticle,
  remarkDescriptionList,
  remarkEmbed,
  remarkHeadingId,
  remarkRemovePosition,
  remarkResolveReference,
  remarkSection,
} from "./plugins";

export type ArticleDatabase = {
  articles: Article[];
};

export async function exportArticleDatabase(
  fromDir: string,
  imageExportDir: string,
  dataExportDir: string,
): Promise<void> {
  const articles = await processArticles(fromDir, imageExportDir);
  sortArticles(articles);

  const tags = getAllTags(articles);

  const databaseSerialized: ArticleDatabaseSerialized = {
    tags,
    articles,
  };

  const databasePath = path.join(dataExportDir, ARTICLE_DATABASE_NAME);

  await fs.mkdir(path.dirname(databasePath), { recursive: true });
  await fs.writeFile(databasePath, JSON.stringify(databaseSerialized));
}

async function processArticles(
  fromDir: string,
  toDir: string,
): Promise<Article[]> {
  const slugs = await findArticleSlugs(fromDir);
  const articlePaths = slugs.map((slug) => ({ slug, fromDir, toDir }));

  const articles = await Promise.all(
    articlePaths.map((articlePath) => processArticle(articlePath)),
  );

  return articles;
}

function getAllTags(articles: Article[]): string[] {
  const tagSet = new Set<string>();

  articles.forEach((article) => {
    article.tags.forEach((tag) => tagSet.add(tag));
  });

  return Array.from(tagSet);
}

function sortArticles(articles: Article[]): void {
  articles.sort((a, b) => {
    const compareCreatedAt = Temporal.ZonedDateTime.compare(
      Temporal.ZonedDateTime.from(a.createdAt),
      Temporal.ZonedDateTime.from(b.createdAt),
    );

    if (compareCreatedAt !== 0) {
      return -compareCreatedAt;
    }

    if (a.updatedAt && b.updatedAt) {
      return -Temporal.ZonedDateTime.compare(
        Temporal.ZonedDateTime.from(a.updatedAt),
        Temporal.ZonedDateTime.from(b.updatedAt),
      );
    } else if (a.updatedAt && !b.updatedAt) {
      return -1;
    } else if (!a.updatedAt && b.updatedAt) {
      return 1;
    } else {
      return 0;
    }
  });
}

async function findArticleSlugs(basePath: string): Promise<string[]> {
  const pattern = path.join(basePath, "*", MARKDOWN_FILENAME);
  const files = await fg(pattern);

  return files.map((filePath) => {
    return path.basename(path.dirname(filePath));
  });
}

async function processArticle(articlePath: ArticlePath): Promise<Article> {
  const processor = unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRemovePosition)
    .use(remarkResolveReference)
    .use(remarkEmbed)
    .use(remarkDescriptionList)
    .use(remarkHeadingId)
    .use(remarkSection)
    .use(remarkArticle, articlePath)
    .freeze();

  const filePath = path.join(
    articlePath.fromDir,
    articlePath.slug,
    MARKDOWN_FILENAME,
  );

  const fileContent = await fs.readFile(filePath, "utf-8");

  const article = await processor.run(processor.parse(fileContent));

  return article;
}
