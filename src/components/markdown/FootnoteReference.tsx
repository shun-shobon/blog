import type {
  FootnoteDefinition as FootnoteDefinitionNode,
  FootnoteReference as FootnoteReferenceNode,
} from "mdast";

import styles from "./markdown.module.css";
import { getFootnoteDefId, getFootnoteIndex, getFootnoteRefId } from "./utils";

type Props = {
  children: FootnoteReferenceNode;
  footnoteDefs: FootnoteDefinitionNode[];
};

export function FootnoteReference({
  children: footnoteRef,
  footnoteDefs,
}: Props): JSX.Element {
  const index = getFootnoteIndex(footnoteRef, footnoteDefs);
  const fnRefId = getFootnoteRefId(index);
  const fnDefId = getFootnoteDefId(index);

  return (
    <sup
      id={fnRefId}
      aria-labelledby={fnDefId}
      className={styles.footnoteReference}
    >
      <a href={`#${fnDefId}`} className={styles.link}>
        {index}
      </a>
    </sup>
  );
}
