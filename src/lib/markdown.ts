import * as fs from "node:fs/promises";
import * as path from "node:path";

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

export async function findArticleSlugs(basePath: string): Promise<string[]> {
  const pattern = path.join(basePath, "*", MARKDOWN_FILENAME);
  const files = await fg(pattern);

  return files.map((filePath) => {
    return path.basename(path.dirname(filePath));
  });
}

export async function processArticle(
  articlePath: ArticlePath,
): Promise<Article> {
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
