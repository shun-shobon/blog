import type {
  AlignType,
  FootnoteDefinition as FootnoteDefinitionNode,
  TableRow as TableRowNode,
} from "mdast";

import { TableCell } from "./TableCell";

type Props = {
  head?: boolean | undefined;
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
          head={head}
          key={idx}
          align={align[idx]}
          footnoteDefs={footnoteDefs}
        >
          {child}
        </TableCell>
      ))}
    </tr>
  );
}
