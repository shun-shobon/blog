import type { Node, Parent } from "unist";
import { visit as unistVisit } from "unist-util-visit";

type Test<T extends Node> = (node: Node) => node is T;
type Visitor<T extends Node> = (
  node: T,
  index: number | null,
  parent: Parent | null,
) => void;

// @ts-ignore: unist-util-visit has **very** **very** complex types so this effects type checking
export const visit = unistVisit as <T extends Node>(
  tree: Node,
  test: Test<T>,
  visitor: Visitor<T>,
) => void;
