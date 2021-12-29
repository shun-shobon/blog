import fg from "fast-glob";
import * as path from "path";
import * as fs from "fs/promises";
import * as O from "fp-ts/Option";
import * as E from "fp-ts/Either";
import * as A from "fp-ts/Array";
import * as t from "io-ts";
import { extractFrontmatter } from "./frontmatter";

export function getArticlePath(basePath: string): Promise<string[]> {
  return fg("*/*/main.md", {
    cwd: basePath,
  }).then((x) => x.sort().reverse());
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
  contents: string;
};

export async function getArticle(
  basePath: string,
  filePath: string,
): Promise<E.Either<Error, Article>> {
  const raw = await fs.readFile(path.join(basePath, filePath), "utf-8");

  const optionalFrontmatter = extractFrontmatter(raw);
  if (O.isNone(optionalFrontmatter))
    return E.left(new Error(`No frontmatter found in ${filePath}`));

  const rawFrontmatter = optionalFrontmatter.value.frontmatter;
  const contents = optionalFrontmatter.value.content;

  const frontmatter = Frontmatter.decode(rawFrontmatter);
  if (E.isLeft(frontmatter))
    return E.left(new Error(`Invalid frontmatter in ${filePath}`));

  const [date, name] = filePath.split("/");
  if (date === undefined || name === undefined) {
    return E.left(new Error("Invalid file path"));
  }
  const slug = `${date}-${name}`;
  const postedAt = new Date(date).toISOString();

  return E.right(
    Object.assign({}, frontmatter.right, { slug, postedAt, contents }),
  );
}

export async function fetchArticles(
  basePath: string,
): Promise<E.Either<Error, Article[]>> {
  const paths = await getArticlePath(basePath);
  const articles = await Promise.all(paths.map((x) => getArticle(basePath, x)));
  return A.sequence(E.either)(articles);
}
