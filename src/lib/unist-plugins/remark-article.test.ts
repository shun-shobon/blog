import endent from "endent";
import type { Root } from "mdast";
import remarkFrontmatter from "remark-frontmatter";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { u } from "unist-builder";
import { describe, expect, test } from "vitest";

import { remarkRemovePosition, remarkSection, Section } from ".";
import { remarkArticle } from "./remark-article";

describe("remarkDescriptionList", () => {
  test("When a root is valid format (fron AST)", () => {
    const transformer = unified().use(remarkArticle).freeze();
    const ast: Root = u("root", [
      u(
        "yaml",
        endent`
          emoji: ":memo:"
          tags:
            - tag1
            - tag2
        `,
      ),
      u("section", [
        u("heading", { depth: 1 }, [u("text", "title")]),
        u("paragraph", [u("text", "content")]),
      ]) as Section,
    ]);

    const result = transformer.runSync(ast);
    expect(result).toEqual(
      u(
        "article",
        {
          plainTitle: "title",
          emoji: ":memo:",
          tags: ["tag1", "tag2"],
        },
        [
          u("heading", { depth: 1 }, [u("text", "title")]),
          u("paragraph", [u("text", "content")]),
        ],
      ),
    );
  });

  test("When a frontmatter is invalid format (from AST)", () => {
    const transformer = unified().use(remarkArticle).freeze();
    const ast: Root = u("root", [
      u(
        "yaml",
        endent`
          tags:
            - tag1
            - tag2
        `,
      ),
      u("section", [
        u("heading", { depth: 1 }, [u("text", "title")]),
        u("paragraph", [u("text", "content")]),
      ]) as Section,
    ]);

    expect(() => transformer.runSync(ast)).toThrow();
  });

  test("When a section is invalid format (from AST)", () => {
    const transformer = unified().use(remarkArticle).freeze();
    const ast: Root = u("root", [
      u(
        "yaml",
        endent`
          emoji: ":memo:"
          tags:
            - tag1
            - tag2
        `,
      ),
      u("section", [
        u("heading", { depth: 1 }, [u("text", "title")]),
        u("paragraph", [u("text", "content")]),
      ]) as Section,
      u("section", [
        u("heading", { depth: 1 }, [u("text", "title")]),
        u("paragraph", [u("text", "content")]),
      ]) as Section,
    ]);

    expect(() => transformer.runSync(ast)).toThrow();
  });

  test("When a root is valid format (fron Markdown)", () => {
    const transformer = unified()
      .use(remarkParse)
      .use(remarkFrontmatter)
      .use(remarkRemovePosition)
      .use(remarkSection)
      .use(remarkArticle)
      .freeze();

    const markdown = endent`
      ---
      emoji: ":memo:"
      tags:
        - tag1
        - tag2
      ---
      # **title**

      content
    `;

    const result = transformer.runSync(transformer.parse(markdown));
    expect(result).toEqual(
      u(
        "article",
        {
          plainTitle: "title",
          emoji: ":memo:",
          tags: ["tag1", "tag2"],
        },
        [
          u("heading", { depth: 1 }, [u("strong", [u("text", "title")])]),
          u("paragraph", [u("text", "content")]),
        ],
      ),
    );
  });
});
