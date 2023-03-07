import katex from "katex";
import type { InlineMath as InlineMathNode } from "mdast-util-math";

type Props = {
  children: InlineMathNode;
};

export function InlineMath({ children: { value } }: Props): JSX.Element {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: katex.renderToString(value),
      }}
    />
  );
}
