import type { Parent } from "mdast";
import { toString } from "mdast-util-to-string";

import { isParagraph, isSection } from "../utils";
import { visit } from "../visit";

const LEAD_MAX_LENGTH = 150;

export function mdastLead(tree: Parent): string {
  let lead = "";
  visit(tree, isParagraph, (node, _idx, parent) => {
    if (!isSection(parent)) return "SKIP";

    lead += toString(node);
    if (lead.length >= LEAD_MAX_LENGTH) return false;

    return true;
  });

  if (lead.length > LEAD_MAX_LENGTH) {
    lead = lead.slice(0, LEAD_MAX_LENGTH - 1);
    lead += "…";
  }

  return lead;
}
