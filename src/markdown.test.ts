import endent from "endent";

import { parseMarkdown } from "./markdown";

test("parseMarkdown", async () => {
  const markdown = endent`
    # Hello, World!
  `;

  const ast = await parseMarkdown(markdown);
  console.log(ast);
});
