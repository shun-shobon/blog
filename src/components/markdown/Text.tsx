import type { Text as TextNode } from "mdast";

import { Twemoji } from "../Twemoji";

type Props = {
  children: TextNode;
};

export function Text({ children: { value } }: Props): JSX.Element {
  return <Twemoji>{value}</Twemoji>;
}
