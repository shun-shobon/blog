import endent from "endent";
import type { Root } from "mdast";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { u } from "unist-builder";
import { describe, expect, test } from "vitest";

import { remarkRemovePosition } from ".";
import { remarkResolveReference } from "./remark-resolve-reference";

describe("remarkResolveReference", () => {
  test("When a link ref is found (fron AST)", () => {
    const transformer = unified().use(remarkResolveReference).freeze();
    const ast: Root = u("root", [
      u("paragraph", [
        u(
          "linkReference",
          { identifier: "example", referenceType: "full" as const },
          [u("text", "example site")],
        ),
      ]),
      u("definition", { identifier: "example", url: "https://example.com" }),
    ]);

    const result = transformer.runSync(ast);
    expect(result).toEqual(
      u("root", [
        u("paragraph", [
          u("link", { url: "https://example.com" }, [
            u("text", "example site"),
          ]),
        ]),
      ]),
    );
  });

  test("When a link ref is not found (from AST)", () => {
    const transformer = unified().use(remarkResolveReference).freeze();
    const ast: Root = u("root", [
      u("paragraph", [
        u(
          "linkReference",
          { identifier: "example", referenceType: "full" as const },
          [u("text", "example site")],
        ),
      ]),
      u("definition", { identifier: "invalid", url: "https://example.com" }),
    ]);

    const result = transformer.runSync(ast);
    expect(result).toEqual(
      u("root", [u("paragraph", [u("text", "[example site][example]")])]),
    );
  });

  test("When a link ref is found (from Markdown)", () => {
    const transformer = unified()
      .use(remarkParse)
      .use(remarkRemovePosition)
      .use(remarkResolveReference)
      .freeze();

    const markdown = endent`
      [example site][example]

      [example]: https://example.com
    `;

    const result = transformer.runSync(transformer.parse(markdown));
    expect(result).toEqual(
      u("root", [
        u("paragraph", [
          u("link", { url: "https://example.com", title: null }, [
            u("text", "example site"),
          ]),
        ]),
      ]),
    );
  });
});
