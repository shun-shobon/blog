import type {
  Definition,
  ImageReference,
  Link,
  LinkReference,
  Paragraph,
  Parent,
  Text,
} from "mdast";
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

export function isLinkReference(node?: Node | null): node is LinkReference {
  return node != null && node.type === "linkReference";
}

export function isImageReference(node?: Node | null): node is ImageReference {
  return node != null && node.type === "imageReference";
}

export function isDefinition(node?: Node | null): node is Definition {
  return node != null && node.type === "definition";
}
