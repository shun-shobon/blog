import type {
  Content,
  Definition,
  Image,
  ImageReference,
  Link,
  LinkReference,
  Root,
  StaticPhrasingContent,
  Text,
} from "mdast";
import { compact } from "mdast-util-compact";
import type { Plugin } from "unified";
import type { Visitor } from "unist-util-visit";

import { UnreachableError } from "@/lib/utils";

import {
  isDefinition,
  isImageReference,
  isLinkReference,
  isParent,
} from "./utils";
import { visit } from "./visit";

export const remarkResolveReference: Plugin<never[], Root> = () => {
  return (tree) => {
    const definitionMap = new Map<string, Definition>();

    const definitionVisitor = definitionVisitorBuilder(definitionMap);
    const linkReferenceVisitor = linkReferenceVisitorBuilder(definitionMap);
    const imageReferenceVisitor = imageReferenceVisitorBuilder(definitionMap);

    visit(tree, isDefinition, definitionVisitor);
    visit(tree, isLinkReference, linkReferenceVisitor);
    visit(tree, isImageReference, imageReferenceVisitor);
  };
};

const definitionVisitorBuilder = (
  definitionMap: Map<string, Definition>,
): Visitor<Definition> => {
  return (node, idx, parent) => {
    if (!isParent(parent) || idx === null) throw new UnreachableError();

    definitionMap.set(node.identifier, node);
    parent.children.splice(idx, 1);
  };
};

const linkReferenceVisitorBuilder = (
  definitionMap: Map<string, Definition>,
): Visitor<LinkReference> => {
  return (node, idx, parent) => {
    if (!isParent(parent) || idx === null) throw new UnreachableError();

    const definition = definitionMap.get(node.identifier);
    if (!definition) {
      const nodes: StaticPhrasingContent[] = [
        { type: "text", value: "[" },
        ...node.children,
        { type: "text", value: "]" },
        { type: "text", value: `[${node.identifier}]` },
      ];
      parent.children.splice(idx, 1, ...nodes);
      // SAFETY: `parent` is a `Parent` and Root and Content extends Parent.
      compact(parent as Root | Content);
      return;
    }

    const link: Link = {
      type: "link",
      url: definition.url,
      title: definition.title,
      children: node.children,
    };
    parent.children[idx] = link;
  };
};

const imageReferenceVisitorBuilder = (
  definitionMap: Map<string, Definition>,
): Visitor<ImageReference> => {
  return (node, idx, parent) => {
    if (!isParent(parent) || idx === null) throw new UnreachableError();

    const definition = definitionMap.get(node.identifier);
    if (!definition) {
      const text: Text = {
        type: "text",
        value: `![${node.alt ?? ""}][${node.identifier}]`,
      };
      parent.children[idx] = text;
      // SAFETY: `parent` is a `Parent` and Root and Content extends Parent.
      compact(parent as Root | Content);
      return;
    }

    const image: Image = {
      type: "image",
      alt: node.alt,
      url: definition.url,
      title: definition.title,
    };
    parent.children[idx] = image;
  };
};
