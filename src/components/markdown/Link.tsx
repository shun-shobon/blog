import type {
  FootnoteDefinition as FootnoteDefinitionNode,
  Link as LinkNode,
} from "mdast";
import NextLink from "next/link";

import { PhrasingContentList } from "./PhrasingContent";

type Props = {
  children: LinkNode;
  footnoteDefs: FootnoteDefinitionNode[];
};

export function Link({
  children: { children, url, title },
  footnoteDefs,
}: Props): JSX.Element {
  const content = (
    <PhrasingContentList footnoteDefs={footnoteDefs}>
      {children}
    </PhrasingContentList>
  );

  return isLocalLink(url) ? (
    <NextLink href={url} title={title ?? undefined}>
      {content}
    </NextLink>
  ) : (
    <a href={url} title={title ?? undefined} target="_blank" rel="noreferrer">
      {content}
    </a>
  );
}

function isLocalLink(url: string): boolean {
  try {
    new URL(url);
    return false;
  } catch {
    return true;
  }
}
