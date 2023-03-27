import type {
  BlockContent as BlockContentNode,
  Blockquote as BlockquoteNode,
  FootnoteDefinition as FootnoteDefinitionNode,
} from "mdast";

import { BlockContentList } from "./BlockContent";
import styles from "./markdown.module.css";

interface Props {
  children: BlockquoteNode;
  footnoteDefs: Array<FootnoteDefinitionNode>;
}

export function Blockquote({
  children: { children },
  footnoteDefs,
}: Props): JSX.Element {
  return (
    <blockquote className={styles.blockquote}>
      <BlockContentList footnoteDefs={footnoteDefs}>
        {/* SAFETY: `DefinitionContent` is not expected to appear. */}
        {children as Array<BlockContentNode>}
      </BlockContentList>
    </blockquote>
  );
}
