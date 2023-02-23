import type {
  Definition,
  Heading,
  ImageReference,
  Link,
  LinkReference,
  List,
  ListItem,
  Paragraph,
  Parent,
  Text,
  YAML,
} from "mdast";
import type { Node } from "unist";

import type { Section } from "./remark-section";

export function findNodeAfter<T extends Node>(
  tree: Parent,
  after: number,
  predicate: (node: Node) => node is T,
): [T, number] | [undefined, undefined] {
  const idx = tree.children.slice(after).findIndex(predicate);
  if (idx === -1) return [undefined, undefined];

  const index = idx + after;
  return [tree.children[index] as T, index];
}

export function isParent(node?: Node | null): node is Parent {
  return node != null && Object.hasOwn(node, "children");
}

export function isYAML(node?: Node | null): node is YAML {
  return node != null && node.type === "yaml";
}

export function isSection(node?: Node | null): node is Section {
  return node != null && node.type === "section";
}

export function isHeading(node?: Node | null): node is Heading {
  return node != null && node.type === "heading";
}

export function isHeadingOfDepth(depth: number) {
  return (node?: Node | null): node is Heading => {
    return isHeading(node) && node.depth === depth;
  };
}

export function isParagraph(node?: Node | null): node is Paragraph {
  return node != null && node.type === "paragraph";
}

export function isList(node?: Node | null): node is List {
  return node != null && node.type === "list";
}

export function isListItem(node?: Node | null): node is ListItem {
  return node != null && node.type === "listItem";
}

export function isText(node?: Node | null): node is Text {
  return node != null && node.type === "text";
}

export function isLink(node?: Node | null): node is Link {
  return node != null && node.type === "link";
}

export function isLinkReference(node?: Node | null): node is LinkReference {
  return node != null && node.type === "linkReference";
}

export function isImageReference(node?: Node | null): node is ImageReference {
  return node != null && node.type === "imageReference";
}

export function isDefinition(node?: Node | null): node is Definition {
  return node != null && node.type === "definition";
}
