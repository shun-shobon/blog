import type { InlineCode as InlineCodeNode } from "mdast";

import styles from "./markdown.module.css";

type Props = {
  children: InlineCodeNode;
};

export function InlineCode({ children: { value } }: Props): JSX.Element {
  return <code className={styles.inlineCode}>{value}</code>;
}
