import endent from "endent";
import { test } from "vitest";

import { parseMarkdown } from "./markdown";

test("parseMarkdown", async () => {
  const markdown = endent`
    # Hello, World!

    This is a test article.
  `;

  const ast = await parseMarkdown(markdown);
  console.dir(ast, { depth: 10 });
});
