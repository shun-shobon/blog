import type { Heading, Parent } from "mdast";
import type { Parent as UnistParent } from "unist";

import { isSection } from "../utils";

export interface Toc extends UnistParent {
  type: "toc";
  heading: Heading;
  children: Toc[];
}

export function mdastToc(tree: Parent): Toc[] {
  return createToc(tree);
}

function createToc(tree: Parent): Toc[] {
  return tree.children.filter(isSection).map((section) => ({
    type: "toc",
    heading: section.children[0],
    children: createToc(section),
  }));
}
