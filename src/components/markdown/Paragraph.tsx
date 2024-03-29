import type {
  FootnoteDefinition as FootnoteDefinitionNode,
  Paragraph as ParagraphNode,
} from "mdast";

import styles from "./markdown.module.css";
import { PhrasingContentList } from "./PhrasingContent";

interface Props {
  children: ParagraphNode;
  footnoteDefs: Array<FootnoteDefinitionNode>;
}

export function Paragraph({
  children: { children },
  footnoteDefs,
}: Props): JSX.Element {
  return (
    <p className={styles.pragraph}>
      <PhrasingContentList footnoteDefs={footnoteDefs}>
        {children}
      </PhrasingContentList>
    </p>
  );
}
