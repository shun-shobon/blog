import type {
  BlockContent as BlockContentNode,
  FootnoteDefinition as FootnoteDefinitionNode,
} from "mdast";

import type { DescriptionDescription as DescriptionDescriptionNode } from "@/lib/plugins";

import { BlockContentList } from "./BlockContent";
import styles from "./markdown.module.css";

interface Props {
  children: DescriptionDescriptionNode;
  footnoteDefs: Array<FootnoteDefinitionNode>;
}

export function DescriptionDescription({
  children: { children },
  footnoteDefs,
}: Props): JSX.Element {
  return (
    <dd className={styles.descriptionDescription}>
      <BlockContentList footnoteDefs={footnoteDefs}>
        {/* SAFETY: `DefinitionContent` is not expected to appear. */}
        {children as Array<BlockContentNode>}
      </BlockContentList>
    </dd>
  );
}
