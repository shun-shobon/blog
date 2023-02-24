import endent from "endent";
import type { Root } from "mdast";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { u } from "unist-builder";
import { describe, expect, test } from "vitest";

import { remarkRemovePosition } from ".";
import { remarkDescriptionList } from "./remark-description-list";

describe("remarkDescriptionList", () => {
  test("When a description list is found (fron AST)", () => {
    const transformer = unified().use(remarkDescriptionList).freeze();
    const ast: Root = u("root", [
      u("list", [
        u("listItem", [
          u("paragraph", [u("text", "term 1:")]),
          u("list", [
            u("listItem", [
              u("paragraph", [
                u("text", "definition 1"),
                u("text", "definition 2"),
              ]),
            ]),
          ]),
        ]),
        u("listItem", [
          u("paragraph", [u("text", "term 2:")]),
          u("list", [
            u("listItem", [u("paragraph", [u("text", "definition 3")])]),
          ]),
        ]),
      ]),
    ]);

    const result = transformer.runSync(ast);
    expect(result).toEqual(
      u("root", [
        u("descriptionList", [
          u("descriptionTerm", [u("text", "term 1")]),
          u("descriptionDescription", [
            u("paragraph", [
              u("text", "definition 1"),
              u("text", "definition 2"),
            ]),
          ]),
          u("descriptionTerm", [u("text", "term 2")]),
          u("descriptionDescription", [
            u("paragraph", [u("text", "definition 3")]),
          ]),
        ]),
      ]),
    );
  });

  test("When a description list is not found (from AST)", () => {
    const transformer = unified().use(remarkDescriptionList).freeze();
    const ast: Root = u("root", [
      u("list", [
        u("listItem", [
          u("paragraph", [u("text", "term 1:")]),
          u("list", [
            u("listItem", [
              u("paragraph", [
                u("text", "definition 1"),
                u("text", "definition 2"),
              ]),
            ]),
          ]),
        ]),
        u("listItem", [
          u("paragraph", [u("text", "term 2")]),
          u("list", [
            u("listItem", [u("paragraph", [u("text", "definition 3")])]),
          ]),
        ]),
      ]),
    ]);

    const result = transformer.runSync(ast);
    expect(result).toEqual(
      u("root", [
        u("list", [
          u("listItem", [
            u("paragraph", [u("text", "term 1:")]),
            u("list", [
              u("listItem", [
                u("paragraph", [
                  u("text", "definition 1"),
                  u("text", "definition 2"),
                ]),
              ]),
            ]),
          ]),
          u("listItem", [
            u("paragraph", [u("text", "term 2")]),
            u("list", [
              u("listItem", [u("paragraph", [u("text", "definition 3")])]),
            ]),
          ]),
        ]),
      ]),
    );
  });

  test("When a link ref is found (from Markdown)", () => {
    const transformer = unified()
      .use(remarkParse)
      .use(remarkRemovePosition)
      .use(remarkDescriptionList)
      .freeze();

    const markdown = endent`
      - term 1:
        - definition 1
        - definition 2
      - term 2:
        - definition 3
    `;

    const result = transformer.runSync(transformer.parse(markdown));
    expect(result).toEqual(
      u("root", [
        u("descriptionList", [
          u("descriptionTerm", [u("text", "term 1")]),
          u("descriptionDescription", [
            u("paragraph", [u("text", "definition 1")]),
          ]),
          u("descriptionDescription", [
            u("paragraph", [u("text", "definition 2")]),
          ]),
          u("descriptionTerm", [u("text", "term 2")]),
          u("descriptionDescription", [
            u("paragraph", [u("text", "definition 3")]),
          ]),
        ]),
      ]),
    );
  });
});
