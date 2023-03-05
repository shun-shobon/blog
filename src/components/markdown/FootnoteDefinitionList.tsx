import type { FootnoteDefinition as FootnoteDefinitionNode } from "mdast";

import { FootnoteDefinition } from "./FootnoteDefinition";
import styles from "./markdown.module.css";

type Props = {
  children: FootnoteDefinitionNode[];
};

export function FootnoteDefinitionList({ children }: Props): JSX.Element {
  return (
    <ol className={styles.list}>
      {children.map((footnote, idx) => (
        <FootnoteDefinition key={idx} idx={idx + 1} footnoteDefs={children}>
          {footnote}
        </FootnoteDefinition>
      ))}
    </ol>
  );
}
