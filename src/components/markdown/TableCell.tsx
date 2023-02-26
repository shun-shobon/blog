import type {
  AlignType,
  FootnoteDefinition as FootnoteDefinitionNode,
  TableCell as TableCellNode,
} from "mdast";

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
  let className;
  switch (align) {
    case "left":
      className = "align-left";
      break;
    case "right":
      className = "align-right";
      break;
    case "center":
      className = "align-center";
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
