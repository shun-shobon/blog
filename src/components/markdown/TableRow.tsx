import type {
  AlignType,
  FootnoteDefinition as FootnoteDefinitionNode,
  TableRow as TableRowNode,
} from "mdast";

import { TableCell } from "./TableCell";

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
  return (
    <tr>
      {children.map((child, idx) => (
        <TableCell
          key={idx}
          head
          align={align[idx]}
          footnoteDefs={footnoteDefs}
        >
          {child}
        </TableCell>
      ))}
    </tr>
  );
}
