import type {
  BlockContent as BlockContentNode,
  FootnoteDefinition as FootnoteDefinitionNode,
} from "mdast";

import {
  Blockquote,
  Code,
  DescriptionList,
  Embed,
  Heading,
  HTML,
  List,
  Math,
  Paragraph,
  Section,
  Table,
  ThematicBreak,
} from ".";

type BlockContentProps = {
  children: BlockContentNode;
  footnoteDefs: FootnoteDefinitionNode[];
};

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

type BlockContentListProps = {
  children: BlockContentNode[];
  footnoteDefs: FootnoteDefinitionNode[];
};

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
