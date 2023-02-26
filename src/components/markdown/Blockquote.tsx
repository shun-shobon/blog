import type {
  BlockContent as BlockContentNode,
  Blockquote as BlockquoteNode,
  FootnoteDefinition as FootnoteDefinitionNode,
} from "mdast";

import { BlockContentList } from ".";

type Props = {
  children: BlockquoteNode;
  footnoteDefs: FootnoteDefinitionNode[];
};

export function Blockquote({
  children: { children },
  footnoteDefs,
}: Props): JSX.Element {
  return (
    <p>
      <BlockContentList footnoteDefs={footnoteDefs}>
        {/* SAFETY: `DefinitionContent` is not expected to appear. */}
        {children as BlockContentNode[]}
      </BlockContentList>
    </p>
  );
}
