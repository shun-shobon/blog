import classNames from "classnames";
import type {
  AlignType,
  FootnoteDefinition as FootnoteDefinitionNode,
  TableCell as TableCellNode,
} from "mdast";

import styles from "./markdown.module.css";
import { PhrasingContentList } from "./PhrasingContent";

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
  let alignClass;
  switch (align) {
    case "left":
      alignClass = styles.tableCellLeft;
      break;
    case "right":
      alignClass = styles.tableCellRight;
      break;
    case "center":
      alignClass = styles.tableCellCenter;
      break;
  }

  const Tag = head ? "th" : "td";

  return (
    <Tag className={classNames(styles.tableCell, alignClass)}>
      <PhrasingContentList footnoteDefs={footnoteDefs}>
        {children}
      </PhrasingContentList>
    </Tag>
  );
}
