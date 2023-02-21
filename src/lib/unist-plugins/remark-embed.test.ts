import endent from "endent";
import type { Root } from "mdast";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { u } from "unist-builder";
import { describe, expect, test } from "vitest";

import { remarkEmbed } from "./remark-embed";

describe("remarkEmbed", () => {
  test("from mdast AST", () => {
    const transformer = unified().use(remarkEmbed).freeze();
    const ast: Root = u("root", [
      u("paragraph", [
        u("link", { url: "https://example.com" }, [
          u("text", "https://example.com"),
        ]),
      ]),
    ]);

    const result = transformer.runSync(ast);
    expect(result).toEqual(u("root", [u("embed", "https://example.com")]));
  });

  test("When URL and text are different", () => {
    const transformer = unified().use(remarkEmbed).freeze();
    const ast: Root = u("root", [
      u("paragraph", [
        u("link", { url: "https://example.com" }, [u("text", "example")]),
      ]),
    ]);

    const result = transformer.runSync(ast);
    expect(result).toEqual(ast);
  });

  test("from markdown", () => {
    const transformer = unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkEmbed)
      .freeze();

    const markdown = endent`
      https://example.com
    `;

    const result = transformer.runSync(transformer.parse(markdown));
    expect(result.children[0]).toEqual(u("embed", "https://example.com"));
  });
});
