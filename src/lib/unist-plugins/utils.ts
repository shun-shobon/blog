import type { Link, Paragraph, Parent, Text } from "mdast";
import type { Node } from "unist";

export function isParent(node?: Node | null): node is Parent {
  return node != null && Object.hasOwn(node, "children");
}

export function isParagraph(node?: Node | null): node is Paragraph {
  return node != null && node.type === "paragraph";
}

export function isText(node?: Node | null): node is Text {
  return node != null && node.type === "text";
}

export function isLink(node?: Node | null): node is Link {
  return node != null && node.type === "link";
}
