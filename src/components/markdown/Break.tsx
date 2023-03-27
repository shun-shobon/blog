import type { Break as BreakNode } from "mdast";

interface Props {
  children: BreakNode;
}

export function Break(_props: Props): JSX.Element {
  return <br />;
}
