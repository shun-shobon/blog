import type { Node, Parent } from "unist";
import { visit as unistVisit } from "unist-util-visit";

type Test<T extends Node> = (node: Node) => node is T;
export type Visitor<T extends Node> = (
  node: T,
  index: number | null,
  parent: Parent | null,
) => VisitorResult;
export type VisitorResult = void | boolean | "SKIP";

export const visit = unistVisit as <T extends Node>(
  tree: Node,
  test: Test<T>,
  visitor: Visitor<T>,
) => void;
