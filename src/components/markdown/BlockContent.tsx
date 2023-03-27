import type {
  BlockContent as BlockContentNode,
  FootnoteDefinition as FootnoteDefinitionNode,
} from "mdast";

import { Blockquote } from "./Blockquote";
import { Code } from "./Code";
import { DescriptionList } from "./DescriptionList";
import { Embed } from "./Embed";
import { Heading } from "./Heading";
import { HTML } from "./HTML";
import { List } from "./List";
import { Math } from "./Math";
import { Paragraph } from "./Paragraph";
import { Section } from "./Section";
import { Table } from "./Table";
import { ThematicBreak } from "./ThematicBreak";

interface BlockContentProps {
  children: BlockContentNode;
  footnoteDefs: Array<FootnoteDefinitionNode>;
}

export function BlockContent({
  children,
  footnoteDefs,
}: BlockContentProps): JSX.Element {
  switch (children.type) {
    case "blockquote":
      return <Blockquote footnoteDefs={footnoteDefs}>{children}</Blockquote>;
    case "code":
      return <Code>{children}</Code>;
    case "descriptionList":
      return (
        <DescriptionList footnoteDefs={footnoteDefs}>
          {children}
        </DescriptionList>
      );
    case "embed":
      // @ts-expect-error: Server Component
      return <Embed>{children}</Embed>;
    case "heading":
      return <Heading footnoteDefs={footnoteDefs}>{children}</Heading>;
    case "html":
      return <HTML>{children}</HTML>;
    case "list":
      return <List footnoteDefs={footnoteDefs}>{children}</List>;
    case "paragraph":
      return <Paragraph footnoteDefs={footnoteDefs}>{children}</Paragraph>;
    case "table":
      return <Table footnoteDefs={footnoteDefs}>{children}</Table>;
    case "thematicBreak":
      return <ThematicBreak>{children}</ThematicBreak>;
    case "math":
      return <Math>{children}</Math>;
    case "section":
      return <Section footnoteDefs={footnoteDefs}>{children}</Section>;
  }
}

interface BlockContentListProps {
  children: Array<BlockContentNode>;
  footnoteDefs: Array<FootnoteDefinitionNode>;
}

export function BlockContentList({
  children,
  footnoteDefs,
}: BlockContentListProps): JSX.Element {
  return (
    <>
      {children.map((child, idx) => (
        <BlockContent key={idx} footnoteDefs={footnoteDefs}>
          {child}
        </BlockContent>
      ))}
    </>
  );
}
