import type {
  Emphasis as EmphasisNode,
  FootnoteDefinition as FootnoteDefinitionNode,
} from "mdast";

import { PhrasingContentList } from "./PhrasingContent";

interface Props {
  children: EmphasisNode;
  footnoteDefs: Array<FootnoteDefinitionNode>;
}

export function Emphasis({
  children: { children },
  footnoteDefs,
}: Props): JSX.Element {
  return (
    <em>
      <PhrasingContentList footnoteDefs={footnoteDefs}>
        {children}
      </PhrasingContentList>
    </em>
  );
}
