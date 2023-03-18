import type { Code as CodeNode } from "mdast";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/prism";
import { nord as style } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  children: CodeNode;
};

export function Code({ children: { value, lang } }: Props): JSX.Element {
  return (
    <div>
      <SyntaxHighlighter language={lang ?? undefined} style={style}>
        {value}
      </SyntaxHighlighter>
    </div>
  );
}
