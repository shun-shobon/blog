import type {
  BlockContent as BlockContentNode,
  FootnoteDefinition as FootnoteDefinitionNode,
  ListItem as ListItemNode,
} from "mdast";

import { BlockContentList } from ".";

type Props = {
  children: ListItemNode;
  footnoteDefs: FootnoteDefinitionNode[];
};

export function ListItem({
  children: { children },
  footnoteDefs,
}: Props): JSX.Element {
  return (
    <li>
      <BlockContentList footnoteDefs={footnoteDefs}>
        {/* SAFETY: `DefinitionContent` is not expected to appear. */}
        {children as BlockContentNode[]}
      </BlockContentList>
    </li>
  );
}
