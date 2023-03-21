import type { Code as CodeNode } from "mdast";
import type { CSSProperties } from "react";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/prism";
import { nord as style } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  children: CodeNode;
};

export function Code({ children }: Props): JSX.Element {
  const code = children.value;
  // lang:filename | diff:filename | diff:lang:filename
  const metadata = (children.lang ?? "").split(":");

  const isDiff = metadata[0] === "diff";

  if (isDiff) {
    const lang = metadata.length === 3 ? metadata[1] : undefined;

    return <CodeDiff code={code} lang={lang} />;
  }

  const [lang, _filename] = metadata;
  return (
    <div>
      <SyntaxHighlighter language={lang} style={style} wrapLines>
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

type CodeDiffProps = {
  code: string;
  lang: string | undefined;
};

function CodeDiff({ code, lang }: CodeDiffProps): JSX.Element {
  const lines = code.split("\n");

  const addLines = lines
    .map((line, index) => [line, index] as const)
    .filter(([line]) => line.startsWith("+"))
    .map(([_, index]) => index + 1);
  const delLines = lines
    .map((line, index) => [line, index] as const)
    .filter(([line]) => line.startsWith("-"))
    .map(([_, index]) => index + 1);

  return (
    <div>
      <SyntaxHighlighter
        language={lang}
        style={style}
        wrapLines
        // HACK: https://github.com/react-syntax-highlighter/react-syntax-highlighter/issues/288
        showLineNumbers
        lineNumberStyle={{ display: "none" }}
        lineProps={(lineNumber) => {
          const style: CSSProperties = { display: "block" };

          if (addLines.includes(lineNumber)) {
            style.backgroundColor = "#33402e";
          }
          if (delLines.includes(lineNumber)) {
            style.backgroundColor = "#402e2e";
          }

          return { style };
        }}
      >
        {lines.map((line) => line.slice(1)).join("\n")}
      </SyntaxHighlighter>
    </div>
  );
}
