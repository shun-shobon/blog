import * as path from "node:path";

import type { Content, FootnoteDefinition, Heading, Parent, Root } from "mdast";
import { toString } from "mdast-util-to-string";
import { hasLength } from "ts-array-length";
import type { Plugin } from "unified";

import { isSection } from "../utils";
import type { ArticleDate } from "./article-date";
import { readArticleChangedDate } from "./article-date";
import { mdastFootnote } from "./mdast-footnote";
import { Frontmatter, mdastFrontmatter } from "./mdast-frontmatter";
import { mdastLead } from "./mdast-lead";
import { mdastLocalImage } from "./mdast-local-image";

export type { LocalImage } from "./mdast-local-image";

export const MARKDOWN_FILENAME = "README.md";

export interface Article extends Parent, Frontmatter, ArticleDate {
  type: "article";
  slug: string;
  lead: string;
  plainTitle: string;
  children: [Heading, ...Content[]];
  footnotes: FootnoteDefinition[];
}

export type ArticlePath = {
  slug: string;
  fromDir: string;
  toDir: string;
};

type Option = [ArticlePath];

export const remarkArticle: Plugin<Option, Root, Article> = (articlePath) => {
  return async (tree) => {
    await mdastLocalImage(tree, articlePath);

    const articleFilePath = path.join(articlePath.slug, MARKDOWN_FILENAME);
    const articleDate = await readArticleChangedDate(
      articlePath.fromDir,
      articleFilePath,
    );

    const frontmatter = mdastFrontmatter(tree);

    const article = createArticle(
      tree,
      articlePath.slug,
      frontmatter,
      articleDate,
    );

    return article;
  };
};

function createArticle(
  tree: Root,
  slug: string,
  frontmatter: Frontmatter,
  articleDate: ArticleDate,
): Article {
  if (!hasLength(tree.children, 1)) {
    throw new Error(
      `Expected 1 child, but got ${tree.children.length} children`,
    );
  }
  const section = tree.children[0];
  if (!isSection(section)) {
    throw new Error(`Expected Section node, but got ${section.type} node`);
  }
  const heading = section.children[0];
  if (heading.depth !== 1) {
    throw new Error(
      `Expected 1st child of Section node to be Heading node of depth 1, but got ${heading.type} node of depth ${heading.depth}`,
    );
  }

  const footnotes = mdastFootnote(tree);
  const lead = mdastLead(section);
  const plainTitle = toString(section.children[0]);

  const article: Article = {
    type: "article",
    slug,
    lead,
    plainTitle,
    footnotes,
    children: section.children,
    ...articleDate,
    ...frontmatter,
  };
  return article;
}
