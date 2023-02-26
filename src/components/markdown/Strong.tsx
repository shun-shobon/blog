import type {
  FootnoteDefinition as FootnoteDefinitionNode,
  Strong as StrongNode,
} from "mdast";

import { PhrasingContentList } from "./PhrasingContent";

type Props = {
  children: StrongNode;
  footnoteDefs: FootnoteDefinitionNode[];
};

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
