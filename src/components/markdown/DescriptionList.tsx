import type { FootnoteDefinition as FootnoteDefinitionNode } from "mdast";

import type { DescriptionList as DescriptionListNode } from "@/lib/plugins";

import { DescriptionListContentList } from ".";

type Props = {
  children: DescriptionListNode;
  footnoteDefs: FootnoteDefinitionNode[];
};

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
