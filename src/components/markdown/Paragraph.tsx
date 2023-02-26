import type {
  FootnoteDefinition as FootnoteDefinitionNode,
  Paragraph as ParagraphNode,
} from "mdast";

import { PhrasingContentList } from ".";

type Props = {
  children: ParagraphNode;
  footnoteDefs: FootnoteDefinitionNode[];
};

export function Paragraph({
  children: { children },
  footnoteDefs,
}: Props): JSX.Element {
  return (
    <p>
      <PhrasingContentList footnoteDefs={footnoteDefs}>
        {children}
      </PhrasingContentList>
    </p>
  );
}
