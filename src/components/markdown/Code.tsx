"use client";

import type { Code as CodeNode } from "mdast";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { duotoneDark as style } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  children: CodeNode;
};

export function Code({ children: { value, lang } }: Props): JSX.Element {
  return (
    <div data-component="true">
      <SyntaxHighlighter
        language={lang ?? undefined}
        style={style}
        showLineNumbers
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
}
