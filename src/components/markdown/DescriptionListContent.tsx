import type { FootnoteDefinition as FootnoteDefinitionNode } from "mdast";

import type { DescriptionListContent as DescriptionListContentNode } from "@/lib/plugins";

// import { DescriptionDescription, DescriptionTerm } from ".";
import { DescriptionDescription } from "./DescriptionDescription";
import { DescriptionTerm } from "./DescriptionTerm";

interface DescriptionListContentProps {
  children: DescriptionListContentNode;
  footnoteDefs: Array<FootnoteDefinitionNode>;
}

export function DescriptionListContent({
  children,
  footnoteDefs,
}: DescriptionListContentProps): JSX.Element {
  switch (children.type) {
    case "descriptionTerm":
      return (
        <DescriptionTerm footnoteDefs={footnoteDefs}>
          {children}
        </DescriptionTerm>
      );
    case "descriptionDescription":
      return (
        <DescriptionDescription footnoteDefs={footnoteDefs}>
          {children}
        </DescriptionDescription>
      );
  }
}

interface DescriptionListContentListProps {
  children: Array<DescriptionListContentNode>;
  footnoteDefs: Array<FootnoteDefinitionNode>;
}

export function DescriptionListContentList({
  children,
  footnoteDefs,
}: DescriptionListContentListProps): JSX.Element {
  return (
    <>
      {children.map((child, idx) => (
        <DescriptionListContent key={idx} footnoteDefs={footnoteDefs}>
          {child}
        </DescriptionListContent>
      ))}
    </>
  );
}
