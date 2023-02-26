import type {
  AlignType,
  FootnoteDefinition as FootnoteDefinitionNode,
  TableRow as TableRowNode,
} from "mdast";

import { TableCell } from ".";

type Props = {
  head?: boolean;
  align: AlignType[];
  children: TableRowNode;
  footnoteDefs: FootnoteDefinitionNode[];
};

export function TableRow({
  head,
  align,
  children: { children },
  footnoteDefs,
}: Props): JSX.Element {
  const Tag = head ? "th" : "td";

  return (
    <Tag>
      {children.map((child, idx) => (
        <TableCell key={idx} align={align[idx]} footnoteDefs={footnoteDefs}>
          {child}
        </TableCell>
      ))}
    </Tag>
  );
}
