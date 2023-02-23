import type { Content, Heading, Parent, Root } from "mdast";
import type { Plugin } from "unified";

import { findNodeAfter, isHeadingOfDepth } from "./utils";

export interface Section {
  type: "section";
  children: [Heading, ...Content[]];
}

export const remarkSection: Plugin<never[], Root> = () => {
  return (tree) => {
    process(tree, 1);
  };
};

function process(tree: Parent, depth: number): void {
  if (depth > 6) return;

  let index = 0;
  while (index < tree.children.length) {
    const [startHeading, startHeadingIdx] = findNodeAfter(
      tree,
      index,
      isHeadingOfDepth(depth),
    );
    if (!startHeading) break;

    const [_endHeading, endHeadingIdx] = findNodeAfter(
      tree,
      startHeadingIdx + 1,
      isHeadingOfDepth(depth),
    );

    const section: Section = {
      type: "section",
      children: [
        startHeading,
        ...tree.children.slice(startHeadingIdx + 1, endHeadingIdx),
      ],
    };
    process(section, depth + 1);
    tree.children.splice(
      startHeadingIdx,
      (endHeadingIdx ?? tree.children.length) - startHeadingIdx,
      section,
    );

    index = startHeadingIdx + 1;
  }
}
