"use client";
import type { Math as MathNode } from "mdast-util-math";
import { BlockMath as KatexBlockMath } from "react-katex";

type Props = {
  children: MathNode;
};

export function Math({ children: { value } }: Props): JSX.Element {
  return <KatexBlockMath math={value} />;
}
