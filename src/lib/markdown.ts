import * as fs from "node:fs/promises";
import * as path from "node:path";

import { Temporal } from "@js-temporal/polyfill";
import fg from "fast-glob";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import { unified } from "unified";

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

export type ArticleSummary = Pick<
  Article,
  "title" | "lead" | "createdAt" | "emoji" | "tags"
>;

export async function exportArticles(
  fromDir: string,
  imageExportDir: string,
  dataExportDir: string,
): Promise<void> {
  const articles = await processArticles(fromDir, imageExportDir);

  const articleSummaries: ArticleSummary[] = articles.map(createArticleSummary);
  articleSummaries.sort(
    (a, b) => -Temporal.PlainDate.compare(a.createdAt, b.createdAt),
  );
  const articleSummariesPath = path.join(dataExportDir, "__summaries__.json");
  await fs.mkdir(dataExportDir, { recursive: true });
  await fs.writeFile(articleSummariesPath, JSON.stringify(articleSummaries));

  const promies = articles.map((article) =>
    exportArticle(dataExportDir, article),
  );
  await Promise.all(promies);
}

function createArticleSummary(article: Article): ArticleSummary {
  const { title, lead, createdAt, emoji, tags } = article;
  return { title, lead, createdAt, emoji, tags };
}

async function exportArticle(
  dataExportDir: string,
  article: Article,
): Promise<void> {
  const articlePath = path.join(dataExportDir, `${article.slug}.json`);
  await fs.writeFile(articlePath, JSON.stringify(article));
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
