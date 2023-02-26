import type { InlineCode as InlineCodeNode } from "mdast";

type Props = {
  children: InlineCodeNode;
};

export function InlineCode({ children: { value } }: Props): JSX.Element {
  return <code>{value}</code>;
}
