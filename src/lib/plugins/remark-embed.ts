import type { Literal, Paragraph, Root } from "mdast";
import { hasLength } from "ts-array-length";
import type { Plugin } from "unified";
import type { Node } from "unist";
import type { Parent } from "unist";

import { UnreachableError } from "@/lib/utils";

import { isLink, isParagraph, isParent, isText } from "./utils";
import { visit } from "./visit";

export interface Embed extends Literal {
  type: "embed";
}

export const remarkEmbed: Plugin<Array<never>, Root> = () => {
  return (tree) => {
    visit(tree, isEmbed, visitor);
  };
};

function visitor(
  node: Paragraph,
  idx: number | null,
  parent: Parent | null,
): void {
  if (!isParent(parent) || idx === null) throw new UnreachableError();

  const link = node.children[0];
  if (!isLink(link)) throw new UnreachableError();

  const { url } = link;

  const embed: Embed = {
    type: "embed",
    value: url,
  };
  parent.children[idx] = embed;
}

function isEmbed(node: Node): node is Paragraph {
  if (!isParagraph(node)) return false;

  const { children: paragraphChildren } = node;
  if (!hasLength(paragraphChildren, 1)) return false;

  const [paragraphChild] = paragraphChildren;
  if (!isLink(paragraphChild)) return false;

  const { children: linkChildren, url } = paragraphChild;
  if (!hasLength(linkChildren, 1)) return false;

  const [linkChild] = linkChildren;
  if (!isText(linkChild)) return false;

  const { value: text } = linkChild;

  return text === url && /^https?:\/\//u.test(url);
}
