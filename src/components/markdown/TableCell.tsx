import classNames from "classnames";
import type {
  AlignType,
  FootnoteDefinition as FootnoteDefinitionNode,
  TableCell as TableCellNode,
} from "mdast";

import styles from "./markdown.module.css";
import { PhrasingContentList } from "./PhrasingContent";

interface Props {
  head?: boolean | undefined;
  align: AlignType | undefined;
  children: TableCellNode;
  footnoteDefs: Array<FootnoteDefinitionNode>;
}

export function TableCell({
  head,
  align,
  children: { children },
  footnoteDefs,
}: Props): JSX.Element {
  const alignClass = (() => {
    if (align == null) return;

    switch (align) {
      case "left":
        return styles.tableCellLeft;
      case "right":
        return styles.tableCellRight;
      case "center":
        return styles.tableCellCenter;
    }
  })();

  const Tag = head === true ? "th" : "td";

  return (
    <Tag className={classNames(styles.tableCell, alignClass)}>
      <PhrasingContentList footnoteDefs={footnoteDefs}>
        {children}
      </PhrasingContentList>
    </Tag>
  );
}
