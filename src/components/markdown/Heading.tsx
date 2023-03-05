import type {
  FootnoteDefinition as FootnoteDefinitionsNode,
  Heading as HeadingNode,
} from "mdast";

import styles from "./markdown.module.css";
import { PhrasingContentList } from "./PhrasingContent";

type Props = {
  children: HeadingNode;
  footnoteDefs: FootnoteDefinitionsNode[];
};

export function Heading({
  children: { children, depth, identifier },
  footnoteDefs,
}: Props): JSX.Element {
  const Tag = `h${depth}` as const;

  return (
    <Tag id={identifier} className={styles.heading}>
      <PhrasingContentList footnoteDefs={footnoteDefs}>
        {children}
      </PhrasingContentList>
    </Tag>
  );
}
