import endent from "endent";
import type { Root } from "mdast";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { u } from "unist-builder";
import { describe, expect, test } from "vitest";

import { remarkRemovePosition } from ".";
import { remarkSection } from "./remark-section";

describe("remarkSection", () => {
  test("When two heading is found (from AST)", () => {
    const transformer = unified().use(remarkSection).freeze();
    const ast: Root = u("root", [
      u("paragraph", [u("text", "Paragraph 1")]),
      u("paragraph", [u("text", "Paragraph 2")]),
      u("heading", { depth: 1 as const }, [u("text", "Heading 1")]),
      u("paragraph", [u("text", "Paragraph 3")]),
      u("heading", { depth: 1 as const }, [u("text", "Heading 2")]),
      u("paragraph", [u("text", "Paragraph 4")]),
      u("paragraph", [u("text", "Paragraph 5")]),
    ]);

    const result = transformer.runSync(ast);

    expect(result).toEqual(
      u("root", [
        u("paragraph", [u("text", "Paragraph 1")]),
        u("paragraph", [u("text", "Paragraph 2")]),
        u("section", [
          u("heading", { depth: 1 as const }, [u("text", "Heading 1")]),
          u("paragraph", [u("text", "Paragraph 3")]),
        ]),
        u("section", [
          u("heading", { depth: 1 as const }, [u("text", "Heading 2")]),
          u("paragraph", [u("text", "Paragraph 4")]),
          u("paragraph", [u("text", "Paragraph 5")]),
        ]),
      ]),
    );
  });

  test("When nested heading is found (from AST)", () => {
    const transformer = unified().use(remarkSection).freeze();
    const ast: Root = u("root", [
      u("heading", { depth: 1 as const }, [u("text", "Heading 1")]),
      u("paragraph", [u("text", "Paragraph 1")]),
      u("heading", { depth: 2 as const }, [u("text", "Heading 2")]),
      u("paragraph", [u("text", "Paragraph 2")]),
      u("paragraph", [u("text", "Paragraph 3")]),
    ]);

    const result = transformer.runSync(ast);

    expect(result).toEqual(
      u("root", [
        u("section", [
          u("heading", { depth: 1 as const }, [u("text", "Heading 1")]),
          u("paragraph", [u("text", "Paragraph 1")]),
          u("section", [
            u("heading", { depth: 2 as const }, [u("text", "Heading 2")]),
            u("paragraph", [u("text", "Paragraph 2")]),
            u("paragraph", [u("text", "Paragraph 3")]),
          ]),
        ]),
      ]),
    );
  });

  test("When nested heading is found (from AST)", () => {
    const transformer = unified()
      .use(remarkParse)
      .use(remarkRemovePosition)
      .use(remarkSection)
      .freeze();
    const markdown = endent`
      # Heading 1

      Paragraph 1

      ## Heading 2

      Paragraph 2

      Paragraph 3
    `;

    const result = transformer.runSync(transformer.parse(markdown));

    expect(result).toEqual(
      u("root", [
        u("section", [
          u("heading", { depth: 1 as const }, [u("text", "Heading 1")]),
          u("paragraph", [u("text", "Paragraph 1")]),
          u("section", [
            u("heading", { depth: 2 as const }, [u("text", "Heading 2")]),
            u("paragraph", [u("text", "Paragraph 2")]),
            u("paragraph", [u("text", "Paragraph 3")]),
          ]),
        ]),
      ]),
    );
  });
});
