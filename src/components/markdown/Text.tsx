import type { Text as TextNode } from "mdast";

type Props = {
  children: TextNode;
};

export function Text({ children: { value } }: Props): JSX.Element {
  return <>{value}</>;
}
