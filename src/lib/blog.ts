import * as t from "io-ts";
import type { Root } from "mdast";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { unified } from "unified";
import YAML from "yaml";

import { trying } from "./util";

export type Article = Frontmatter & {
  content: Root;
};

export function parse(markdown: string): Article | ParseError {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkFrontmatter);
  const result = processor.parse(markdown);
  const frontmatterNode = result.children.find((node) => node.type === "yaml");
  if (!frontmatterNode || frontmatterNode.type !== "yaml") {
    return new ParseError("Frontmatter not found");
  }
  const frontmatter = YAML.parse(frontmatterNode.value);
  if (frontmatter instanceof ParseError) {
    return frontmatter;
  }

  // frontmatterを削る
  const content: Root = {
    ...result,
    children: result.children.filter((node) => node.type !== "yaml"),
  };

  return {
    ...frontmatter,
    content,
  };
}

const Frontmatter = t.type({
  title: t.string,
  date: t.string,
  tags: t.array(t.string),
});
type Frontmatter = t.TypeOf<typeof Frontmatter>;

export function parseFrontmatter(
  frontmatter: string,
): Frontmatter | ParseError {
  const parsed = trying(() => YAML.parse(frontmatter));
  if (parsed instanceof Error) {
    return new ParseError("Frontmatter is invalid YAML");
  }

  const validated = Frontmatter.decode(parsed);
  switch (validated._tag) {
    case "Left":
      return new ParseError("Frontmatter is invalid");
    case "Right":
      return validated.right;
  }
}

export class ParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ParseError";
  }
}
