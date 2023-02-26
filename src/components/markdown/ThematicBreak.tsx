import type { ThematicBreak as ThematicBreakNode } from "mdast";

type Props = {
  children: ThematicBreakNode;
};

export function ThematicBreak(_props: Props): JSX.Element {
  return <hr />;
}
