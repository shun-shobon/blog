import * as fs from "node:fs/promises";
import * as path from "node:path";

import { Temporal, toTemporalInstant } from "@js-temporal/polyfill";
import fg from "fast-glob";
import matter from "gray-matter";
import * as z from "zod";

import type { Root } from "./ast";
import { parseMarkdown } from "./markdown";

const MARKDOWN_FILENAME = "README.md";

type FrontMatter = z.infer<typeof FrontMatter>;

export type ArticleSummary = FrontMatter & {
  slug: string;
};

export type Article = ArticleSummary & {
  content: Root;
};

const FrontMatter = z.object({
  title: z.string(),
  postedAt: z.union([
    z.string().transform((str) => Temporal.PlainDate.from(str)),
    z
      .date()
      .transform((date) =>
        toTemporalInstant
          .call(date)
          .toZonedDateTimeISO(Temporal.TimeZone.from("UTC"))
          .toPlainDate(),
      ),
  ]),
  tags: z.array(z.string()).default([]),
});

export async function findArticles(
  basePath: string,
): Promise<ArticleSummary[]> {
  const pattern = path.join(basePath, "*", MARKDOWN_FILENAME);
  const files = await fg(pattern);

  return Promise.all(
    files.map(async (filePath) => {
      const slug = path.basename(path.dirname(filePath));
      const frontMatter = await readFrontMatter(filePath);
      const articleSummary: ArticleSummary = { ...frontMatter, slug };
      return articleSummary;
    }),
  );
}

async function readFrontMatter(filePath: string): Promise<FrontMatter> {
  const rawContent = await fs.readFile(filePath, "utf-8");
  const { data } = matter(rawContent);
  return FrontMatter.parse(data);
}

export async function readArticle(basePath: string, slug: string) {
  const filePath = path.join(basePath, slug, MARKDOWN_FILENAME);
  const fileContent = await fs.readFile(filePath, "utf-8");
  const { data, content: rawContent } = matter(fileContent);
  const frontmatter = FrontMatter.parse(data);
  const content = parseMarkdown(rawContent);

  const article: Article = {
    ...frontmatter,
    slug,
    content,
  };

  return article;
}
