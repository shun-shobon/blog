import type { FootnoteDefinition as FootnoteDefinitionNode } from "mdast";

import type { DescriptionList as DescriptionListNode } from "@/lib/plugins";

import { DescriptionListContentList } from "./DescriptionListContent";

interface Props {
  children: DescriptionListNode;
  footnoteDefs: Array<FootnoteDefinitionNode>;
}

export function DescriptionList({
  children: { children },
  footnoteDefs,
}: Props): JSX.Element {
  return (
    <dl>
      <DescriptionListContentList footnoteDefs={footnoteDefs}>
        {children}
      </DescriptionListContentList>
    </dl>
  );
}
