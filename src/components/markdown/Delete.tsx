import type {
  Delete as DeleteNode,
  FootnoteDefinition as FootnoteDefinitionNode,
} from "mdast";

import { PhrasingContentList } from "./PhrasingContent";

interface Props {
  children: DeleteNode;
  footnoteDefs: Array<FootnoteDefinitionNode>;
}

export function Delete({
  children: { children },
  footnoteDefs,
}: Props): JSX.Element {
  return (
    <del>
      <PhrasingContentList footnoteDefs={footnoteDefs}>
        {children}
      </PhrasingContentList>
    </del>
  );
}
