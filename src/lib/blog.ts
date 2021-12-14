import fg from "fast-glob";
import * as path from "path";
import * as fs from "fs/promises";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import type { Root } from "mdast";
import * as yaml from "yaml";
import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import { pipe } from "fp-ts/function";

export function getArticlePath(basePath: string): Promise<string[]> {
  return fg("*/*.md", {
    cwd: basePath,
  }).then((x) => x.sort());
}

const Frontmatter = t.type({
  title: t.string,
  tags: t.readonlyArray(t.string),
});

export type Article = {
  title: string;
  slug: string;
  postedAt: string;
  tags: ReadonlyArray<string>;
  contents: Root;
};

export async function getArticle(
  basePath: string,
  filePath: string,
): Promise<E.Either<Error, Article>> {
  const raw = await fs.readFile(path.join(basePath, filePath), "utf-8");

  const processor = unified().use(remarkParse).use(remarkFrontmatter);

  const contents = processor.parse(raw);

  if (contents.children[0]?.type !== "yaml")
    return E.left(new Error("No YAML frontmatter found"));

  const frontmatter = pipe(
    contents.children[0].value,
    yaml.parse,
    Frontmatter.decode,
    E.mapLeft((err) => new AggregateError(err)),
  );
  if (E.isLeft(frontmatter)) return frontmatter;

  const [date, name] = filePath.split("/");
  if (date === undefined || name === undefined) {
    return E.left(new Error("Invalid file path"));
  }
  const slug = `${date}-${name.slice(0, -3)}`;
  const postedAt = new Date(date).toISOString();

  return E.right(
    Object.assign({}, frontmatter.right, { slug, postedAt, contents }),
  );
}
