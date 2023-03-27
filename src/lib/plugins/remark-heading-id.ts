import GitHubSlugger from "github-slugger";
import type { Heading, Root } from "mdast";
import { toString } from "mdast-util-to-string";
import type { Plugin } from "unified";

import { isHeading } from "./utils";
import { visit } from "./visit";

export const remarkHeadingId: Plugin<Array<never>, Root> = () => {
  return (tree) => {
    const slugger = new GitHubSlugger();
    const visitor = visitorBuilder(slugger);
    visit(tree, isHeading, visitor);
  };
};

function visitorBuilder(slugger: GitHubSlugger) {
  return (node: Heading) => {
    const plainText = toString(node);
    node.identifier = slugger.slug(plainText);
  };
}
