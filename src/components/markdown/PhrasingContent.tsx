import type {
  FootnoteDefinition as FootnoteDefinitionNode,
  PhrasingContent,
} from "mdast";

import {
  Break,
  Delete,
  Emphasis,
  FootnoteReference,
  HTML,
  Image,
  InlineCode,
  InlineMath,
  Link,
  LocalImage,
  Strong,
  Text,
} from ".";

type PhasingContentProps = {
  children: PhrasingContent;
  footnoteDefs: FootnoteDefinitionNode[];
};

export function PhrasingContent({
  children,
  footnoteDefs,
}: PhasingContentProps): JSX.Element {
  switch (children.type) {
    case "break":
      return <Break>{children}</Break>;
    case "delete":
      return <Delete footnoteDefs={footnoteDefs}>{children}</Delete>;
    case "emphasis":
      return <Emphasis footnoteDefs={footnoteDefs}>{children}</Emphasis>;
    case "footnoteReference":
      return (
        <FootnoteReference footnoteDefs={footnoteDefs}>
          {children}
        </FootnoteReference>
      );
    case "html":
      return <HTML>{children}</HTML>;
    case "image":
      // SAFETY: This is my component.
      // eslint-disable-next-line jsx-a11y/alt-text
      return <Image>{children}</Image>;
    case "inlineCode":
      return <InlineCode>{children}</InlineCode>;
    case "inlineMath":
      return <InlineMath>{children}</InlineMath>;
    case "link":
      return <Link footnoteDefs={footnoteDefs}>{children}</Link>;
    case "localImage":
      return <LocalImage>{children}</LocalImage>;
    case "strong":
      return <Strong footnoteDefs={footnoteDefs}>{children}</Strong>;
    case "text":
      return <Text>{children}</Text>;

    case "footnote":
    case "imageReference":
    case "linkReference":
      throw new Error("Not implemented");
  }
}

type PhasingContentListProp = {
  children: PhrasingContent[];
  footnoteDefs: FootnoteDefinitionNode[];
};

export function PhrasingContentList({
  children,
  footnoteDefs,
}: PhasingContentListProp): JSX.Element {
  return (
    <>
      {children.map((child, idx) => (
        <PhrasingContent key={idx} footnoteDefs={footnoteDefs}>
          {child}
        </PhrasingContent>
      ))}
    </>
  );
}
