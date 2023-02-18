import type {
  Literal as UnistLiteral,
  Node,
  Parent as UnistParent,
} from "unist";

export type Content =
  | Section
  | Heading
  | Paragraph
  | ThematicBreak
  | Blockquote
  | List
  | ListItem
  | Table
  | TableRow
  | TableCell
  | HTML
  | Code
  | Text
  | Emphasis
  | Strong
  | Delete
  | InlineCode
  | Break
  | Link
  | Image
  | FootnoteReference
  | FootnoteDefinition
  | Math
  | InlineMath;

export interface Parent extends UnistParent {
  children: Content[];
}

export interface Literal extends UnistLiteral {
  value: string;
}

export interface Root extends Parent {
  type: "root";
  footnotes: FootnoteDefinition[];
}

export interface Section extends Parent {
  type: "section";
  heading: Heading;
}

export interface Paragraph extends Parent {
  type: "paragraph";
}

export interface Heading extends Parent {
  type: "heading";
  depth: 1 | 2 | 3 | 4 | 5 | 6;
  identifier: string;
}

export interface ThematicBreak extends Node {
  type: "thematicBreak";
}

export interface Blockquote extends Parent {
  type: "blockquote";
}

export interface List extends Parent {
  type: "list";
  ordered?: boolean | null | undefined;
  start?: number | null | undefined;
  spread?: boolean | null | undefined;
  children: ListItem[];
}

export interface ListItem extends Parent {
  type: "listItem";
  checked?: boolean | null | undefined;
  spread?: boolean | null | undefined;
}

export interface Table extends Parent {
  type: "table";
  align?: AlignType[] | null | undefined;
  children: TableRow[];
}

export interface TableRow extends Parent {
  type: "tableRow";
  children: TableCell[];
}

export interface TableCell extends Parent {
  type: "tableCell";
}

export interface HTML extends Literal {
  type: "html";
}

export interface Code extends Literal {
  type: "code";
  lang?: string | null | undefined;
  meta?: string | null | undefined;
}

export interface FootnoteDefinition extends Parent {
  type: "footnoteDefinition";
  number: number;
}

export interface Text extends Literal {
  type: "text";
}

export interface Emphasis extends Parent {
  type: "emphasis";
}

export interface Strong extends Parent {
  type: "strong";
}

export interface Delete extends Parent {
  type: "delete";
}

export interface InlineCode extends Literal {
  type: "inlineCode";
}

export interface Break extends Node {
  type: "break";
}

export interface Link extends Parent, Resource {
  type: "link";
}

export interface Image extends Node, Resource, Alternative {
  type: "image";
}

export interface FootnoteReference extends Node {
  type: "footnoteReference";
  number: number;
}

export interface Math extends Literal {
  type: "math";
  meta?: string | undefined | null;
}

export interface InlineMath extends Literal {
  type: "inlineMath";
}

// Mixin
export interface Resource {
  url: string;
  title?: string | null | undefined;
}

export interface Alternative {
  alt?: string | null | undefined;
}

export type AlignType = "left" | "right" | "center" | null;
