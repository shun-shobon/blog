import katex from "katex";
import type { Math as MathNode } from "mdast-util-math";

import styles from "./markdown.module.css";

type Props = {
  children: MathNode;
};

export function Math({ children: { value } }: Props): JSX.Element {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: katex.renderToString(value, { displayMode: true }),
      }}
      className={styles.math}
    />
  );
}
