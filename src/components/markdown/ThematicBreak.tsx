import type { ThematicBreak as ThematicBreakNode } from "mdast";

import styles from "./markdown.module.css";

type Props = {
  children: ThematicBreakNode;
};

export function ThematicBreak(_props: Props): JSX.Element {
  return <hr className={styles.thematicBreak} />;
}
