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

    const transform = (
      mdastChildren: MdastContent[],
      depth: number,
    ): Content[] => {
      if (depth > 6 || mdastChildren.length === 0) {
        return mdastChildren as Content[];
      }

      const res: Content[] = [];
      let trailing = mdastChildren;
      let currentHead: Heading | null = null;
      while (trailing.length > 0) {
        const headIdx = trailing.findIndex(
          (node) => node.type === "heading" && node.depth === depth,
        );

        const children: Content[] = transform(
          trailing.slice(
            0,
            // 次の見出しがない場合は末尾までを対象にする
            headIdx === -1 ? undefined : headIdx,
          ),
          depth + 1,
        );

        if (currentHead === null) {
          res.push(...children);
        } else {
          const section: Section = {
            type: "section",
            heading: currentHead!,
            children,
          };
          res.push(section);
        }

        if (headIdx === -1) {
          break;
        }

        currentHead = trailing[headIdx] as Heading;
        trailing = trailing.slice(headIdx + 1);
      }

      return res;
    };

    const root: Root = {
      type: "root",
      children: transform(mdastRoot.children, 1),
    };

    return next(null, root, file);
  };

  return transformer;
};
