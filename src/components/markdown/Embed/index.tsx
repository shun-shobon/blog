import { fetchOgp } from "@/lib/ogp";
import type { Embed as EmbedNode } from "@/lib/plugins";

import { LinkCard } from "./LinkCard";
import { TwitterCard } from "./TwitterCard";

interface Props {
  children: EmbedNode;
}

export async function Embed({
  children: { value },
}: Props): Promise<JSX.Element> {
  const ogp = await fetchOgp(value);

  let Tag;
  switch (getEmbedType(value)) {
    case "twitter":
      Tag = TwitterCard;
      break;
    default:
      Tag = LinkCard;
      break;
  }

  return <Tag ogp={ogp} url={value} />;
}

type EmbedType = "link" | "twitter";

function getEmbedType(url: string): EmbedType {
  const urlObj = new URL(url);

  if (urlObj.hostname === "twitter.com") {
    return "twitter";
  }

  return "link";
}
