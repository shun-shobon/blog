import type {
  FootnoteDefinition as FootnoteDefinitionNode,
  Table as TableNode,
} from "mdast";
import { hasMinLength } from "ts-array-length";

import { TableRow } from "./TableRow";

type Props = {
  children: TableNode;
  footnoteDefs: FootnoteDefinitionNode[];
};

export function Table({
  children: { children, align },
  footnoteDefs,
}: Props): JSX.Element {
  if (!hasMinLength(children, 2)) {
    throw new Error("Table must have at least two rows");
  }
  const [headerRow, ...bodyRows] = children;

  return (
    <table>
      <thead>
        <TableRow head align={align ?? []} footnoteDefs={footnoteDefs}>
          {headerRow}
        </TableRow>
      </thead>
      <tbody>
        {bodyRows.map((row, idx) => (
          <TableRow key={idx} align={align ?? []} footnoteDefs={footnoteDefs}>
            {row}
          </TableRow>
        ))}
      </tbody>
    </table>
  );
}
