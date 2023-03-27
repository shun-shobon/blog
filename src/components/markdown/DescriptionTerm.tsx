import type { FootnoteDefinition as FootnoteDefinitionNode } from "mdast";

import type { DescriptionTerm as DescriptionTermNode } from "@/lib/plugins";

import styles from "./markdown.module.css";
import { PhrasingContentList } from "./PhrasingContent";

interface Props {
  children: DescriptionTermNode;
  footnoteDefs: Array<FootnoteDefinitionNode>;
}

export function DescriptionTerm({
  children: { children },
  footnoteDefs,
}: Props): JSX.Element {
  return (
    <dt className={styles.descriptionTerm}>
      <PhrasingContentList footnoteDefs={footnoteDefs}>
        {children}
      </PhrasingContentList>
    </dt>
  );
}
