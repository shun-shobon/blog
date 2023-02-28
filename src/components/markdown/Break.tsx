import type { Break as BreakNode } from "mdast";

type Props = {
  children: BreakNode;
};

export function Break(_props: Props): JSX.Element {
  return <br />;
}
