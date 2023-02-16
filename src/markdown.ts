import type {
  Definition as MdastDefinition,
  FootnoteDefinition as MdastFootnoteDefinition,
  Root as MdastRoot,
} from "mdast";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import type { Plugin, Transformer } from "unified";
import { unified } from "unified";
import { inspect } from "unist-util-inspect";
import { visit } from "unist-util-visit";

import type { Root } from "./ast";

export function parseMarkdown(markdown: string) {
  const parser = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .freeze();
  const mdastAst = parser.parse(markdown);

  const transformer = unified().use(remarkAst).freeze();

  return transformer.runSync(mdastAst);
}

const remarkAst: Plugin<unknown[], MdastRoot, Root> = () => {
  const transformer: Transformer<MdastRoot, Root> = (node, file, next) => {
    const defs = new Map<string, MdastDefinition>();
    const fnDefs = new Map<string, MdastFootnoteDefinition>();

    visit(node, "definition", (def) => {
      defs.set(def.identifier, def);
    });
    visit(node, "footnoteDefinition", (fnDef) => {
      fnDefs.set(fnDef.identifier, fnDef);
    });

    return next(null, node, file);
  };

  return transformer;
};
