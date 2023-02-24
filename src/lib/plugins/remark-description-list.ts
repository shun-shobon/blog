import type {
  BlockContent,
  DefinitionContent,
  List,
  ListItem,
  Parent,
  PhrasingContent,
  Root,
} from "mdast";
import { hasMinLength } from "ts-array-length";
import type { Plugin } from "unified";
import type { Node, Parent as UnistParent } from "unist";

import { UnreachableError } from "@/lib/utils";

import { isList, isListItem, isParagraph, isParent, isText } from "./utils";
import { visit } from "./visit";

export interface DescriptionList extends Parent {
  type: "descriptionList";
  children: DescriptionListContent[];
}

export interface DescriptionTerm extends Parent {
  type: "descriptionTerm";
  children: PhrasingContent[];
}

export interface DescriptionDescription extends Parent {
  type: "descriptionDescription";
  children: (BlockContent | DefinitionContent)[];
}

type DescriptionListContent = DescriptionTerm | DescriptionDescription;

export const remarkDescriptionList: Plugin<never[], Root> = () => {
  return (tree) => {
    visit(tree, isDescription, visitor);
  };
};

function visitor(
  node: List,
  idx: number | null,
  parent: UnistParent | null,
): void {
  if (!isParent(parent) || idx === null) throw new UnreachableError();

  const { children: listChildren } = node;
  const descriptionListChildren = listChildren.flatMap(
    convertListItemToDescriptionListContent,
  );
  const descriptionList: DescriptionList = {
    type: "descriptionList",
    children: descriptionListChildren,
  };

  parent.children[idx] = descriptionList;
}

function convertListItemToDescriptionListContent(
  node: ListItem,
): DescriptionListContent[] {
  const { children: listItemChildren } = node;
  const [term, description] = listItemChildren;
  if (!isParagraph(term)) throw new UnreachableError();
  if (description && !isList(description)) throw new UnreachableError();

  const termLastChild = term.children.at(-1);
  if (!isText(termLastChild)) throw new UnreachableError();

  // Remove the trailing colon
  termLastChild.value = termLastChild.value.slice(0, -1);

  const descriptionTerm: DescriptionTerm = {
    type: "descriptionTerm",
    children: term.children,
  };

  const descriptionDescriptions: DescriptionDescription[] = (
    description?.children ?? []
  ).map(convertListItemToDescriptionDescription);

  return [descriptionTerm, ...descriptionDescriptions];
}

function convertListItemToDescriptionDescription(
  node: ListItem,
): DescriptionDescription {
  return {
    type: "descriptionDescription",
    children: node.children,
  };
}

function isDescription(node: Node): node is List {
  if (!isList(node)) return false;

  const { children: listChildren } = node;
  return listChildren.every(isDescriptionTerm);
}

function isDescriptionTerm(node: Node): node is ListItem {
  if (!isListItem(node)) return false;

  const { children: listItemChildren } = node;
  if (!hasMinLength(listItemChildren, 1)) return false;

  const [term, description] = listItemChildren;
  if (!isParagraph(term)) return false;
  if (description && !isList(description)) return false;

  const termLastChild = term.children.at(-1);
  if (!isText(termLastChild)) return false;

  const termLastChildText = termLastChild.value;
  return termLastChildText.endsWith(":") && !termLastChildText.endsWith("\\:");
}
