import type {
  BlockContent as BlockContentNode,
  FootnoteDefinition as FootnoteDefinitionNode,
  ListItem as ListItemNode,
} from "mdast";

import { BlockContentList } from "./BlockContent";

interface Props {
  children: ListItemNode;
  footnoteDefs: Array<FootnoteDefinitionNode>;
}

export function ListItem({
  children: { children },
  footnoteDefs,
}: Props): JSX.Element {
  return (
    <li>
      <BlockContentList footnoteDefs={footnoteDefs}>
        {/* SAFETY: `DefinitionContent` is not expected to appear. */}
        {children as Array<BlockContentNode>}
      </BlockContentList>
    </li>
  );
}
