import ImageComponent from "next/image";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { Code as CodeComponent } from "@/components/Code";
import { Heading as HeadingComponent } from "@/components/Heading";
import { Link as LinkComponent } from "@/components/Link";
import {
  InlineMath as InlineMathComponent,
  Math as MathComponent,
} from "@/components/Math";
import type * as Ast from "@/lib/ast";

type ArticleContentProps = {
  content: Ast.Content[];
};

export function ArticleContent({ content }: ArticleContentProps): JSX.Element {
  return (
    <>
      {content.map((node, idx) => (
        <Content key={idx} node={node} />
      ))}
    </>
  );
}

type ArticleFootnotesProps = {
  footnotes: Ast.FootnoteDefinition[];
};

export function ArticleFootnotes({
  footnotes,
}: ArticleFootnotesProps): JSX.Element | null {
  if (footnotes.length === 0) return null;

  return (
    <>
      <hr />
      <section className="space-y-2">
        <h2 className="sr-only">脚注</h2>
        <ol className="ml-6 list-decimal">
          {footnotes.map((node, idx) => (
            <FootnoteDefinition key={idx} node={node} />
          ))}
        </ol>
      </section>
    </>
  );
}

type ContentProps<T> = {
  node: T;
  children?: ReactNode;
};

function Content({ node, children }: ContentProps<Ast.Content>): JSX.Element {
  switch (node.type) {
    case "section":
      return <Section node={node} />;
    case "paragraph":
      return <Paragraph node={node}>{children}</Paragraph>;
    case "heading":
      return <Heading node={node} />;
    case "thematicBreak":
      return <ThematicBreak node={node} />;
    case "blockquote":
      return <Blockquote node={node} />;
    case "list":
      return <List node={node} />;
    case "listItem":
      return <ListItem node={node} />;
    case "table":
      return <Table node={node} />;
    case "tableRow":
      return <TableRow node={node} />;
    case "tableCell":
      return <TableCell node={node} />;
    case "html":
      return <HTML node={node} />;
    case "code":
      return <Code node={node} />;
    case "footnoteDefinition":
      return <FootnoteDefinition node={node} />;
    case "text":
      return <Text node={node} />;
    case "emphasis":
      return <Emphasis node={node} />;
    case "strong":
      return <Strong node={node} />;
    case "delete":
      return <Delete node={node} />;
    case "inlineCode":
      return <InlineCode node={node} />;
    case "break":
      return <Break node={node} />;
    case "link":
      return <Link node={node} />;
    case "image":
      return <Image node={node} />;
    case "footnoteReference":
      return <FootnoteReference node={node} />;
    case "math":
      return <MathBlock node={node} />;
    case "inlineMath":
      return <InlineMath node={node} />;
  }
}

function Section({ node }: ContentProps<Ast.Section>): JSX.Element {
  return (
    <section className="my-8 space-y-4">
      <Heading node={node.heading} />
      {node.children.map((child, idx) => (
        <Content key={idx} node={child} />
      ))}
    </section>
  );
}

function Paragraph({
  node,
  children,
}: ContentProps<Ast.Paragraph>): JSX.Element {
  return (
    <p>
      {node.children.map((child, idx) => (
        <Content key={idx} node={child} />
      ))}
      {children}
    </p>
  );
}

function Heading({ node }: ContentProps<Ast.Heading>): JSX.Element {
  const level = Math.min(6, node.depth + 1) as 2 | 3 | 4 | 5 | 6;

  return (
    <HeadingComponent
      level={level}
      id={node.identifier}
      className="border-b border-purple-700 dark:border-purple-300"
    >
      {node.children.map((child, idx) => (
        <Content key={idx} node={child} />
      ))}
    </HeadingComponent>
  );
}

function ThematicBreak({}: ContentProps<Ast.ThematicBreak>): JSX.Element {
  return <hr />;
}

function Blockquote({ node }: ContentProps<Ast.Blockquote>): JSX.Element {
  return (
    <blockquote className="border-l-4 border-slate-600 py-2 pl-4 text-slate-600 dark:border-slate-400 dark:text-slate-400">
      {node.children.map((child, idx) => (
        <Content key={idx} node={child} />
      ))}
    </blockquote>
  );
}

function List({ node }: ContentProps<Ast.List>): JSX.Element {
  const children = node.children.map((child, idx) => (
    <ListItem key={idx} node={child} />
  ));

  const base = "ml-6";

  return node.ordered ? (
    <ol className={twMerge(base, "list-decimal")}>{children}</ol>
  ) : (
    <ul className={twMerge(base, "list-disc")}>{children}</ul>
  );
}

function ListItem({ node }: ContentProps<Ast.ListItem>): JSX.Element {
  return (
    <li>
      {node.children.map((child, idx) => (
        <Content key={idx} node={child} />
      ))}
    </li>
  );
}

function Table({ node }: ContentProps<Ast.Table>): JSX.Element {
  const [head, ...body] = node.children;

  return (
    <table className="w-full">
      <thead className="border-t-2 border-b">
        <TableRow node={head!} isHead />
      </thead>
      <tbody className="border-b-2">
        {body.map((row, idx) => (
          <TableRow key={idx} node={row} align={node.align ?? undefined} />
        ))}
      </tbody>
    </table>
  );
}

function TableRow({
  node,
  align,
  isHead,
}: ContentProps<Ast.TableRow> & {
  align?: Ast.AlignType[] | undefined;
  isHead?: boolean | undefined;
}): JSX.Element {
  return (
    <tr>
      {node.children.map((child, idx) => (
        <TableCell
          key={idx}
          node={child}
          align={align?.[idx]}
          isHead={isHead}
        />
      ))}
    </tr>
  );
}

function TableCell({
  node,
  align,
  isHead,
}: ContentProps<Ast.TableCell> & {
  align?: Ast.AlignType | undefined;
  isHead?: boolean | undefined;
}): JSX.Element {
  const Tag = isHead ? "th" : "td";

  const alignClass =
    align === "left"
      ? "text-left"
      : align === "center"
      ? "text-center"
      : align === "right"
      ? "text-right"
      : null;

  return (
    <Tag className={twMerge("p-1", alignClass)}>
      {node.children.map((child, idx) => (
        <Content key={idx} node={child} />
      ))}
    </Tag>
  );
}

function HTML({ node }: ContentProps<Ast.HTML>): JSX.Element {
  return <div dangerouslySetInnerHTML={{ __html: node.value }} />;
}

function Code({ node }: ContentProps<Ast.Code>): JSX.Element {
  return <CodeComponent node={node} />;
}

function Text({ node }: ContentProps<Ast.Text>): JSX.Element {
  return <>{node.value}</>;
}

function Emphasis({ node }: ContentProps<Ast.Emphasis>): JSX.Element {
  return (
    <em>
      {node.children.map((child, idx) => (
        <Content key={idx} node={child} />
      ))}
    </em>
  );
}

function Strong({ node }: ContentProps<Ast.Strong>): JSX.Element {
  return (
    <strong>
      {node.children.map((child, idx) => (
        <Content key={idx} node={child} />
      ))}
    </strong>
  );
}

function Delete({ node }: ContentProps<Ast.Delete>): JSX.Element {
  return (
    <del>
      {node.children.map((child, idx) => (
        <Content key={idx} node={child} />
      ))}
    </del>
  );
}

function InlineCode({ node }: ContentProps<Ast.InlineCode>): JSX.Element {
  return (
    <code className="inline-block rounded px-1.5 py-0.5 dark:bg-slate-900 dark:text-purple-300">
      {node.value}
    </code>
  );
}

function Break({}: ContentProps<Ast.Break>): JSX.Element {
  return <br />;
}

function Link({ node }: ContentProps<Ast.Link>): JSX.Element {
  return (
    <LinkComponent href={node.url} className="underline">
      {node.children.map((child, idx) => (
        <Content key={idx} node={child} />
      ))}
    </LinkComponent>
  );
}

function Image({ node }: ContentProps<Ast.Image>): JSX.Element {
  return <ImageComponent src={node.url} alt={node.alt ?? ""} />;
}

function FootnoteReference({
  node,
}: ContentProps<Ast.FootnoteReference>): JSX.Element {
  return (
    <sup id={`fnref-${node.number}`}>
      <LinkComponent
        className="text-purple-700 hover:underline dark:text-purple-300"
        href={`#fn-${node.number}`}
        aria-describedby={`fn-${node.number}`}
      >
        {node.number}
      </LinkComponent>
    </sup>
  );
}

function FootnoteDefinition({
  node,
}: ContentProps<Ast.FootnoteDefinition>): JSX.Element {
  return (
    <li id={`fn-${node.number}`}>
      {node.children.map((child, idx) => (
        <Content key={idx} node={child}>
          {/* FootnoteDefinitionの子ノードは基本的に1つなのでこれで問題ない */}
          <LinkComponent
            className="ml-2 text-purple-700 dark:text-purple-300"
            href={`#fnref-${node.number}`}
            aria-label="Back to content"
          >
            ↵
          </LinkComponent>
        </Content>
      ))}
    </li>
  );
}

function MathBlock({ node }: ContentProps<Ast.Math>): JSX.Element {
  return <MathComponent node={node} />;
}

function InlineMath({ node }: ContentProps<Ast.InlineMath>): JSX.Element {
  return <InlineMathComponent node={node} />;
}
