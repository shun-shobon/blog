import type {
  BlockContent as BlockContentNode,
  FootnoteDefinition as FootnoteDefinitionNode,
} from "mdast";

import type { DescriptionDescription as DescriptionDescriptionNode } from "@/lib/plugins";

import { BlockContentList } from ".";

type Props = {
  children: DescriptionDescriptionNode;
  footnoteDefs: FootnoteDefinitionNode[];
};

export function DescriptionDescription({
  children: { children },
  footnoteDefs,
}: Props): JSX.Element {
  return (
    <dd>
      <BlockContentList footnoteDefs={footnoteDefs}>
        {/* SAFETY: `DefinitionContent` is not expected to appear. */}
        {children as BlockContentNode[]}
      </BlockContentList>
    </dd>
  );
}
