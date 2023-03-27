import type { InlineCode as InlineCodeNode } from "mdast";

import { Twemoji } from "../Twemoji";
import styles from "./markdown.module.css";

interface Props {
  children: InlineCodeNode;
}

export function InlineCode({ children: { value } }: Props): JSX.Element {
  return (
    <code className={styles.inlineCode}>
      <Twemoji>{value}</Twemoji>
    </code>
  );
}
