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
import { inspect } from "unist-util-inspect";
import { visit } from "unist-util-visit";

import type * as Ast from "./ast";

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

const remarkAst: Plugin<unknown[], MdastRoot, Ast.Root> = () => {
  const transformer: Transformer<MdastRoot, Ast.Root> = (
    mdastRoot,
    file,
    next,
  ) => {
    const defs = new Map<string, MdastDefinition>();
    const fnDefs = new Map<string, MdastFootnoteDefinition>();
    const usedFnDefs: Ast.FootnoteDefinition[] = [];

    visit(mdastRoot, "definition", (def) => {
      defs.set(def.identifier, def);
    });
    visit(mdastRoot, "footnoteDefinition", (fnDef) => {
      fnDefs.set(fnDef.identifier, fnDef);
    });

    const convertOne = (node: MdastContent): Ast.Content | Ast.Content[] => {
      switch (node.type) {
        case "paragraph":
          return {
            type: "paragraph",
            children: convertMany(node.children),
          } satisfies Ast.Paragraph;
        case "heading":
          return {
            type: "heading",
            depth: node.depth,
            identifier: "", // TODO: 生成する
            children: convertMany(node.children),
          } satisfies Ast.Heading;
        case "thematicBreak":
          return {
            type: "thematicBreak",
          } satisfies Ast.ThematicBreak;
        case "blockquote":
          return {
            type: "blockquote",
            children: convertMany(node.children),
          } satisfies Ast.Blockquote;
        case "list":
          return {
            type: "list",
            ordered: node.ordered,
            start: node.start,
            spread: node.spread,
            children: convertMany(node.children) as Ast.ListItem[],
          } satisfies Ast.List;
        case "listItem":
          return {
            type: "listItem",
            checked: node.checked,
            spread: node.spread,
            children: convertMany(node.children),
          } satisfies Ast.ListItem;
        case "table":
          return {
            type: "table",
            align: node.align,
            children: convertMany(node.children) as Ast.TableRow[],
          } satisfies Ast.Table;
        case "tableRow":
          return {
            type: "tableRow",
            children: convertMany(node.children) as Ast.TableCell[],
          } satisfies Ast.TableRow;
        case "tableCell":
          return {
            type: "tableCell",
            children: convertMany(node.children),
          } satisfies Ast.TableCell;
        case "html":
          return {
            type: "html",
            value: node.value,
          } satisfies Ast.HTML;
        case "code":
          return {
            type: "code",
            lang: node.lang,
            value: node.value,
          } satisfies Ast.Code;
        case "text":
          return {
            type: "text",
            value: node.value,
          } satisfies Ast.Text;
        case "emphasis":
          return {
            type: "emphasis",
            children: convertMany(node.children),
          } satisfies Ast.Emphasis;
        case "strong":
          return {
            type: "strong",
            children: convertMany(node.children),
          } satisfies Ast.Strong;
        case "delete":
          return {
            type: "delete",
            children: convertMany(node.children),
          } satisfies Ast.Delete;
        case "inlineCode":
          return {
            type: "inlineCode",
            value: node.value,
          } satisfies Ast.InlineCode;
        case "break":
          return {
            type: "break",
          } satisfies Ast.Break;
        case "link":
          return {
            type: "link",
            url: node.url,
            title: node.title,
            children: convertMany(node.children),
          } satisfies Ast.Link;
        case "linkReference": {
          const def = defs.get(node.identifier);
          if (!def) {
            return [
              {
                type: "text",
                value: "[",
              } satisfies Ast.Text,
              ...convertMany(node.children),
              {
                type: "text",
                value: `][${node.identifier}]`,
              } satisfies Ast.Text,
            ];
          }
          return {
            type: "link",
            url: def.url,
            title: def.title,
            children: convertMany(node.children),
          } satisfies Ast.Link;
        }
        case "image":
          return {
            type: "image",
            url: node.url,
            title: node.title,
            alt: node.alt,
          } satisfies Ast.Image;
        case "imageReference": {
          const def = defs.get(node.identifier);
          if (!def) {
            return [
              {
                type: "text",
                value: "![",
              } satisfies Ast.Text,
              {
                type: "text",
                value: node.alt ?? "",
              } satisfies Ast.Text,
              {
                type: "text",
                value: `][${node.identifier}]`,
              } satisfies Ast.Text,
            ];
          }
          return {
            type: "image",
            url: def.url,
            title: def.title,
            alt: node.alt,
          } satisfies Ast.Image;
        }
        case "footnoteReference": {
          const fnDef = fnDefs.get(node.identifier);
          if (!fnDef) {
            return {
              type: "text",
              value: `[^${node.identifier}]`,
            } satisfies Ast.Text;
          }

          const usedFnDef = convertFootnoteDefinition(fnDef);
          usedFnDefs.push(usedFnDef);
          return {
            type: "footnoteReference",
            number: usedFnDef.number,
          } satisfies Ast.FootnoteReference;
        }
        case "footnoteDefinition":
          return [];
        case "math":
          return {
            type: "math",
            value: node.value,
          } satisfies Ast.Math;
        case "inlineMath":
          return {
            type: "inlineMath",
            value: node.value,
          } satisfies Ast.InlineMath;
        default:
          throw new Error(`Unexpected node type: ${inspect(node)}`);
      }
    };
    const convertMany = (nodes: MdastContent[]): Ast.Content[] => {
      return nodes.flatMap(convertOne);
    };
    const convertFootnoteDefinition = (
      mdastFnDef: MdastFootnoteDefinition,
    ): Ast.FootnoteDefinition => {
      return {
        type: "footnoteDefinition",
        number: usedFnDefs.length + 1,
        children: convertMany(mdastFnDef.children),
      };
    };

    const traverse = (
      mdastChildren: MdastContent[],
      depth: number,
    ): Ast.Content[] => {
      if (depth > 6 || mdastChildren.length === 0) {
        return convertMany(mdastChildren);
      }

      const res: Ast.Content[] = [];
      let trailing: MdastContent[] = mdastChildren;
      let currentHead: Ast.Heading | null = null;
      while (trailing.length > 0) {
        const headIdx = trailing.findIndex(
          (node) => node.type === "heading" && node.depth === depth,
        );

        const children: Ast.Content[] = traverse(
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
          const section: Ast.Section = {
            type: "section",
            heading: currentHead!,
            children,
          };
          res.push(section);
        }

        if (headIdx === -1) {
          break;
        }

        currentHead = convertOne(trailing[headIdx]!) as Ast.Heading;
        trailing = trailing.slice(headIdx + 1);
      }

      return res;
    };

    const root: Ast.Root = {
      type: "root",
      footnotes: usedFnDefs,
      children: traverse(mdastRoot.children, 1),
    };

    return next(null, root, file);
  };

  return transformer;
};
