import type {
  FootnoteDefinition as FootnoteDefinitionNode,
  Strong as StrongNode,
} from "mdast";

import { PhrasingContentList } from "./PhrasingContent";

interface Props {
  children: StrongNode;
  footnoteDefs: Array<FootnoteDefinitionNode>;
}

export function Strong({
  children: { children },
  footnoteDefs,
}: Props): JSX.Element {
  return (
    <strong>
      <PhrasingContentList footnoteDefs={footnoteDefs}>
        {children}
      </PhrasingContentList>
    </strong>
  );
}
