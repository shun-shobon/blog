import type {
  BlockContent as BlockContentNode,
  FootnoteDefinition as FootnoteDefinitionNode,
} from "mdast";

import type { Section as SectionNode } from "@/lib/plugins";

import { BlockContentList } from "./BlockContent";
import styles from "./markdown.module.css";

interface Props {
  children: SectionNode;
  footnoteDefs: Array<FootnoteDefinitionNode>;
}

export function Section({
  children: { children },
  footnoteDefs,
}: Props): JSX.Element {
  return (
    <section
      aria-labelledby={children[0].identifier}
      className={styles.section}
    >
      <BlockContentList footnoteDefs={footnoteDefs}>
        {/* SAFETY: No other than `BlockContentNode` is expected to appear */}
        {children as Array<BlockContentNode>}
      </BlockContentList>
    </section>
  );
}
