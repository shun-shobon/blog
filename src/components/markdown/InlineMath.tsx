"use client";

import type { InlineMath as InlineMathNode } from "mdast-util-math";
import { InlineMath as KatexInlineMath } from "react-katex";

type Props = {
  children: InlineMathNode;
};

export function InlineMath({ children: { value } }: Props): JSX.Element {
  return <KatexInlineMath math={value} />;
}
