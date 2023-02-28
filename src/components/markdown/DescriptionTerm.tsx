import type { FootnoteDefinition as FootnoteDefinitionNode } from "mdast";

import type { DescriptionTerm as DescriptionTermNode } from "@/lib/plugins";

import { PhrasingContentList } from "./PhrasingContent";

type Props = {
  children: DescriptionTermNode;
  footnoteDefs: FootnoteDefinitionNode[];
};

export function DescriptionTerm({
  children: { children },
  footnoteDefs,
}: Props): JSX.Element {
  return (
    <dt>
      <PhrasingContentList footnoteDefs={footnoteDefs}>
        {children}
      </PhrasingContentList>
    </dt>
  );
}
