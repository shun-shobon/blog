import type {
  Content,
  FootnoteDefinition,
  FootnoteReference,
  Parent,
  Root,
  Text,
} from "mdast";
import { compact } from "mdast-util-compact";

import { UnreachableError } from "@/lib/utils";

import { isFootnoteDefinition, isFootnoteReference, isParent } from "../utils";
import type { Visitor } from "../visit";
import { visit } from "../visit";

export function mdastFootnote(tree: Parent): Array<FootnoteDefinition> {
  const footnoteDefMap = new Map<string, FootnoteDefinition>();
  const usedFootnoteDefs: Array<FootnoteDefinition> = [];

  const footnoteDefVisitor = footnoteDefVisitorBuilder(footnoteDefMap);
  const footnoteRefVisitor = footnoteRefVisitorBuilder(
    footnoteDefMap,
    usedFootnoteDefs,
  );

  visit(tree, isFootnoteDefinition, footnoteDefVisitor);
  visit(tree, isFootnoteReference, footnoteRefVisitor);

  return usedFootnoteDefs;
}

function footnoteDefVisitorBuilder(
  footnoteDefMap: Map<string, FootnoteDefinition>,
): Visitor<FootnoteDefinition> {
  return (node, idx, parent) => {
    if (!isParent(parent) || idx === null) throw new UnreachableError();

    footnoteDefMap.set(node.identifier, node);
    parent.children.splice(idx, 1);
  };
}

function footnoteRefVisitorBuilder(
  footnoteDefMap: Map<string, FootnoteDefinition>,
  usedFootnoteDefs: Array<FootnoteDefinition>,
): Visitor<FootnoteReference> {
  return (node, idx, parent) => {
    if (!isParent(parent) || idx === null) throw new UnreachableError();

    const definition = footnoteDefMap.get(node.identifier);
    if (!definition) {
      const text: Text = { type: "text", value: `[^${node.identifier}]` };
      parent.children[idx] = text;
      // SAFETY: `parent` is a `Parent` and Root and Content extends Parent.
      compact(parent as Root | Content);
      return;
    }

    if (!usedFootnoteDefs.includes(definition)) {
      usedFootnoteDefs.push(definition);
    }
  };
}
