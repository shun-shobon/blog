import GitHubSlugger from "github-slugger";
import type { Heading, Root } from "mdast";
import { toString } from "mdast-util-to-string";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

import { isHeading } from "./utils";

export const remarkHeadingId: Plugin<never[], Root> = () => {
  return (tree) => {
    const slugger = new GitHubSlugger();
    const visitor = visitorBuilder(slugger);
    // @ts-ignore: Fuck unist-util-visit types.
    visit(tree, isHeading, visitor);
  };
};

function visitorBuilder(slugger: GitHubSlugger) {
  return (node: Heading) => {
    const plainText = toString(node);
    node.identifier = slugger.slug(plainText);
  };
}
