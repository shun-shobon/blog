"use client";

import "katex/dist/katex.min.css";

import {
  BlockMath as BlockMathComponent,
  InlineMath as InlineMathComponent,
} from "react-katex";

import type { InlineMath as InlineMathNode, Math as MathNode } from "@/ast";

type MathProps = {
  node: MathNode;
};

export function Math({ node }: MathProps): JSX.Element {
  return <BlockMathComponent math={node.value} />;
}

type InlineMathProps = {
  node: InlineMathNode;
};

export function InlineMath({ node }: InlineMathProps): JSX.Element {
  return <InlineMathComponent math={node.value} />;
}
