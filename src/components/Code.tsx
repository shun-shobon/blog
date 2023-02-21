"use client";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { duotoneDark as style } from "react-syntax-highlighter/dist/cjs/styles/prism";

import type { Code as CodeNode } from "@/ast";

type Props = {
  node: CodeNode;
};

export function Code({ node }: Props): JSX.Element {
  return (
    <SyntaxHighlighter
      language={node.lang ?? undefined}
      style={style}
      showLineNumbers
    >
      {node.value}
    </SyntaxHighlighter>
  );
}
