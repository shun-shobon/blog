import endent from "endent";
import { u } from "unist-builder";
import { describe, expect, test } from "vitest";

import { parseMarkdown } from "./markdown";

describe("parseMarkdown", () => {
  test("basic", () => {
    const markdown = endent`
      # 1. Heading 1

      This is 1. paragraph.

      ## 1.1. Heading 2

      This is 1.1. paragraph.

      ## 1.2. Heading 2

      This is 1.2. paragraph.

      ### 1.2.1. Heading 3

      This is 1.2.1. paragraph.

      ## 1.3. Heading 2

      This is 1.3. paragraph.

      # 2. Heading 1

      This is 2. paragraph.

      # 3. Heading 1

      This is 3. paragraph.
    `;

    const parsed = parseMarkdown(markdown);
    const expected = [
      u(
        "section",
        {
          heading: u(
            "heading",
            {
              depth: 1,
              identifier: "1.-Heading-1",
            },
            [u("text", "1. Heading 1")],
          ),
        },
        [
          u("paragraph", [u("text", "This is 1. paragraph.")]),
          u(
            "section",
            {
              heading: u(
                "heading",
                {
                  depth: 2,
                  identifier: "1.1.-Heading-2",
                },
                [u("text", "1.1. Heading 2")],
              ),
            },
            [u("paragraph", [u("text", "This is 1.1. paragraph.")])],
          ),
          u(
            "section",
            {
              heading: u(
                "heading",
                {
                  depth: 2,
                  identifier: "1.2.-Heading-2",
                },
                [u("text", "1.2. Heading 2")],
              ),
            },
            [
              u("paragraph", [u("text", "This is 1.2. paragraph.")]),
              u(
                "section",
                {
                  heading: u(
                    "heading",
                    {
                      depth: 3,
                      identifier: "1.2.1.-Heading-3",
                    },
                    [u("text", "1.2.1. Heading 3")],
                  ),
                },
                [u("paragraph", [u("text", "This is 1.2.1. paragraph.")])],
              ),
            ],
          ),
          u(
            "section",
            {
              heading: u(
                "heading",
                {
                  depth: 2,
                  identifier: "1.3.-Heading-2",
                },
                [u("text", "1.3. Heading 2")],
              ),
            },
            [u("paragraph", [u("text", "This is 1.3. paragraph.")])],
          ),
        ],
      ),
      u(
        "section",
        {
          heading: u(
            "heading",
            {
              depth: 1,
              identifier: "2.-Heading-1",
            },
            [u("text", "2. Heading 1")],
          ),
        },
        [u("paragraph", [u("text", "This is 2. paragraph.")])],
      ),
      u(
        "section",
        {
          heading: u(
            "heading",
            {
              depth: 1,
              identifier: "3.-Heading-1",
            },
            [u("text", "3. Heading 1")],
          ),
        },
        [u("paragraph", [u("text", "This is 3. paragraph.")])],
      ),
    ];
    expect(parsed.children).toEqual(expected);
  });

  test("footnote", () => {
    const markdown = endent`
      Hello, world[^1].

      [^1]: This is footnote.

      Hello, world[^2].
    `;

    const parsed = parseMarkdown(markdown);

    expect(parsed.footnotes).toEqual([
      u("footnoteDefinition", { number: 1 }, [
        u("paragraph", [u("text", "This is footnote.")]),
      ]),
    ]);

    expect(parsed.children[0]).toEqual(
      u("paragraph", [
        u("text", "Hello, world"),
        u("footnoteReference", { number: 1 }),
        u("text", "."),
      ]),
    );

    expect(parsed.children[1]).toEqual(
      u("paragraph", [u("text", "Hello, world[^2].")]),
    );
  });

  test("definition", () => {
    const markdown = endent`
      [link][linkDef]

      [linkUndef][linkUndef]

      [linkDef]: https://example.com "example"
      [linkDefUnused]: https://unused.example.com "unused"
    `;

    const parsed = parseMarkdown(markdown);

    expect(parsed.children).toHaveLength(2);

    expect(parsed.children[0]).toEqual(
      u("paragraph", [
        u("link", { title: "example", url: "https://example.com" }, [
          u("text", "link"),
        ]),
      ]),
    );

    expect(parsed.children[1]).toEqual(
      u("paragraph", [u("text", "[linkUndef][linkUndef]")]),
    );
  });
});
