import type { Root } from "mdast";
import * as YAML from "yaml";
import * as z from "zod";

import { isYAML } from "../utils";

export type Frontmatter = z.infer<typeof frontmatterSchema>;
const frontmatterSchema = z.object({
  emoji: z.string(),
  tags: z.array(z.string()).default([]),
});

export function mdastFrontmatter(tree: Root): Frontmatter {
  const yamlNode = tree.children[0];
  if (!isYAML(yamlNode)) {
    const type = yamlNode?.type ?? "undefined";
    throw new Error(
      `1st child expected to be Frontmatter YAML node, but got ${type} node`,
    );
  }

  const yamlParsed = YAML.parse(yamlNode.value) as unknown;
  const frontmatter = frontmatterSchema.parse(yamlParsed);

  tree.children.shift();

  return frontmatter;
}
