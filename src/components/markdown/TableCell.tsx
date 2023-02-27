import type {
  AlignType,
  FootnoteDefinition as FootnoteDefinitionNode,
  TableCell as TableCellNode,
} from "mdast";

import { PhrasingContentList } from "./PhrasingContent";
import styles from "./TableCell.module.css";

type Props = {
  head?: boolean | undefined;
  align: AlignType | undefined;
  children: TableCellNode;
  footnoteDefs: FootnoteDefinitionNode[];
};

export function TableCell({
  head,
  align,
  children: { children },
  footnoteDefs,
}: Props): JSX.Element {
  let className;
  switch (align) {
    case "left":
      className = styles.left;
      break;
    case "right":
      className = styles.right;
      break;
    case "center":
      className = styles.center;
      break;
  }

  const Tag = head ? "th" : "td";

  return (
    <Tag className={className}>
      <PhrasingContentList footnoteDefs={footnoteDefs}>
        {children}
      </PhrasingContentList>
    </Tag>
  );
}
