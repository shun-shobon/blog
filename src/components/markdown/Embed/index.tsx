import type { Embed as EmbedNode } from "@/lib/plugins";

import { LinkCard } from "./LinkCard";
import { TwitterCard } from "./TwitterCard";

interface Props {
  children: EmbedNode;
}

export function Embed({ children: { value } }: Props): JSX.Element {
  switch (getEmbedType(value)) {
    case "twitter":
      return <TwitterCard url={value} />;
    default:
      return <LinkCard url={value} />;
  }
}

type EmbedType = "link" | "twitter";

function getEmbedType(url: string): EmbedType {
  const urlObj = new URL(url);

  if (urlObj.hostname === "twitter.com" || urlObj.hostname === "x.com") {
    return "twitter";
  }

  return "link";
}
