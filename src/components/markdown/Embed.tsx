import type { Embed as EmbedNode } from "@/lib/plugins";

type Props = {
  children: EmbedNode;
};

export function Embed({ children: { value } }: Props): JSX.Element {
  throw new Error("Not implemented");
}
