import endent from "endent";
import { inspect } from "unist-util-inspect";
import { test } from "vitest";

import { parseMarkdown } from "./markdown";

test.only("parseMarkdown", () => {
  const markdown = endent`
    # Hello, World!

    ## This is a test

    This is a test of **the emergency**[^fn] ~~broadcast~~ \`system\`.

    [^fn]: This is a footnote.

    $$
    y = ax^2 + bx + c
    $$

    [link][example]

    [example]: https://example.com "Example site"
  `;

  const ast = parseMarkdown(markdown);
  console.log(inspect(ast));
});
