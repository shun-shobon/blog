import fg from "fast-glob";
import * as path from "path";
import * as fs from "fs/promises";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import * as yaml from "yaml";
import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { pipe, identity } from "fp-ts/function";

export function getArticlePath(basePath: string): Promise<string[]> {
  return fg("*/*.md", {
    cwd: basePath,
  }).then((x) => x.sort());
}

const Frontmatter = t.type({
  title: t.string,
  tags: t.readonlyArray(t.string),
});

export type Article = t.TypeOf<typeof Frontmatter> & {
  slug: string;
  postedAt: string;
};

export async function getArticle(
  basePath: string,
  filePath: string,
): Promise<Article> {
  const raw = await fs.readFile(path.join(basePath, filePath), "utf-8");

  const processor = unified().use(remarkParse).use(remarkFrontmatter);

  const root = processor.parse(raw);

  if (root.children[0]?.type !== "yaml")
    throw new Error("No YAML frontmatter found");

  const frontmatter: t.TypeOf<typeof Frontmatter> = pipe(
    root.children[0].value,
    yaml.parse,
    Frontmatter.decode,
    E.fold((err) => {
      throw new AggregateError(err);
    }, identity),
  );

  const [date, name] = filePath.split("/");
  const slug = `${date}-${name!.slice(0, -3)}`;
  const postedAt = new Date(date!).toISOString();

  return Object.assign({}, frontmatter, { slug, postedAt });
}
