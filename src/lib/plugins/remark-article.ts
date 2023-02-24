import type { Content, Heading, Parent, Root } from "mdast";
import { toString } from "mdast-util-to-string";
import { hasLength } from "ts-array-length";
import type { Plugin } from "unified";
import * as YAML from "yaml";
import * as z from "zod";

import { isSection, isYAML } from "./utils";

interface Article extends Parent, Frontmatter {
  type: "article";
  plainTitle: string;
  children: [Heading, ...Content[]];
}

type Frontmatter = z.infer<typeof frontmatterSchema>;
const frontmatterSchema = z.object({
  emoji: z.string(),
  tags: z.array(z.string()).default([]),
});

export const remarkArticle: Plugin<never[], Root, Article> = () => {
  return (tree) => {
    const frontmatter = extractFrontmatter(tree);
    if (frontmatter instanceof Error) return frontmatter;

    const article = createArticle(tree, frontmatter);
    if (article instanceof Error) return article;

    return article;
  };
};

function extractFrontmatter(tree: Root): Error | Frontmatter {
  const yamlNode = tree.children[0];
  if (!isYAML(yamlNode)) {
    return new Error(
      `1st child expected to be Frontmatter YAML node, but got ${yamlNode?.type}`,
    );
  }

  const yamlParsed = YAML.parse(yamlNode.value) as unknown;
  const parseResult = frontmatterSchema.safeParse(yamlParsed);
  if (!parseResult.success) return parseResult.error;

  const frontmatter = parseResult.data;
  tree.children.shift();

  return frontmatter;
}

function createArticle(tree: Root, frontmatter: Frontmatter): Error | Article {
  if (!hasLength(tree.children, 1)) {
    return new Error(
      `Expected 1 child, but got ${tree.children.length} children`,
    );
  }
  const section = tree.children[0];
  if (!isSection(section)) {
    return new Error(`Expected Section node, but got ${section.type} node`);
  }
  const heading = section.children[0];
  if (heading.depth !== 1) {
    return new Error(
      `Expected 1st child of Section node to be Heading node of depth 1, but got ${heading.type} node of depth ${heading.depth}`,
    );
  }

  const plainTitle = toString(section.children[0]);

  const article: Article = {
    type: "article",
    plainTitle,
    children: section.children,
    ...frontmatter,
  };
  return article;
}
