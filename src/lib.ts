import * as fs from "node:fs/promises";
import * as path from "node:path";

import { Temporal, toTemporalInstant } from "@js-temporal/polyfill";
import fg from "fast-glob";
import matter from "gray-matter";
import * as z from "zod";

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
type FrontMatter = z.infer<typeof FrontMatter>;

type ArticleSummary = FrontMatter & {
  slug: string;
};

export async function findArticles(
  basePath: string,
): Promise<ArticleSummary[]> {
  const pattern = path.join(basePath, "*", "README.md");
  const files = await fg(pattern);

  return Promise.all(
    files.map(async (filePath) => {
      const slug = path.basename(path.dirname(filePath));
      const frontMatter = await parseFrontMatter(filePath);
      const articleSummary: ArticleSummary = { ...frontMatter, slug };
      return articleSummary;
    }),
  );
}

async function parseFrontMatter(filePath: string): Promise<FrontMatter> {
  const rawContent = await fs.readFile(filePath, "utf-8");
  const { data } = matter(rawContent);
  return FrontMatter.parse(data);
}
