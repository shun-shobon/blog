import type { FootnoteDefinition, FootnoteReference } from "mdast";

export function getFootnoteIndex(
  footnoteReference: FootnoteReference,
  footnoteDefinitions: Array<FootnoteDefinition>,
): number {
  const index = footnoteDefinitions.findIndex((footnoteDefinition) => {
    return footnoteDefinition.identifier === footnoteReference.identifier;
  });
  if (index === -1) {
    throw new Error("Footnote definition not found");
  }

  return index + 1;
}

export function getFootnoteRefId(index: number): string {
  return `fnref-${index}`;
}

export function getFootnoteDefId(index: number): string {
  return `fn-${index}`;
}
