import type {
  Content as MdastContent,
  Definition as MdastDefinition,
  FootnoteDefinition as MdastFootnoteDefinition,
  Heading as MdastHeading,
  Root as MdastRoot,
} from "mdast";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import type { Plugin, Transformer } from "unified";
import { unified } from "unified";
import { u } from "unist-builder";
import { inspect } from "unist-util-inspect";
import { visit } from "unist-util-visit";

import type { Content, Heading, Root, Section } from "./ast";

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
  const transformer: Transformer<MdastRoot, Root> = (mdastRoot, file, next) => {
    // const defs = new Map<string, MdastDefinition>();
    // const fnDefs = new Map<string, MdastFootnoteDefinition>();

    // visit(mdastRoot, "definition", (def) => {
    //   defs.set(def.identifier, def);
    // });
    // visit(mdastRoot, "footnoteDefinition", (fnDef) => {
    //   fnDefs.set(fnDef.identifier, fnDef);
    // });

    const splitSections = (mdastChildren: MdastContent[], depth: number) => {
      const res: Content[] = [];

      let currentHeading: MdastHeading | null = null;
      let currentSectionContent: MdastContent[] = [];
      for (const mdastChild of mdastChildren) {
        if (mdastChild.type === "heading" && mdastChild.depth === depth) {
          if (currentHeading === null) {
            currentHeading = mdastChild;
          } else {
            // FIXME: Need transform Mdast to Ast
            const section: Section = u(
              "section",
              { heading: currentHeading as Heading },
              splitSections(currentSectionContent, depth + 1) as Content[],
            );
            res.push(section);
            currentHeading = mdastChild;
            currentSectionContent = [];
          }
        } else {
          if (currentHeading === null) {
            // FIXME: Need transform Mdast to Ast
            res.push(mdastChild as Content);
          } else {
            currentSectionContent.push(mdastChild);
          }
        }
      }
      if (currentHeading !== null) {
        // FIXME: Need transform Mdast to Ast
        const section: Section = u(
          "section",
          { heading: currentHeading as Heading },
          splitSections(currentSectionContent, depth + 1) as Content[],
        );
        res.push(section);
      }

      return res;
    };

    const root: Root = u(
      "root",
      splitSections(mdastRoot.children, 1) as Content[],
    );

    return next(null, root, file);
  };

  return transformer;
};
