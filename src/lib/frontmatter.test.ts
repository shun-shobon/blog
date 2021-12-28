import { extractFrontmatter } from "./frontmatter";
import * as O from "fp-ts/Option";

describe("extractFrontmatter", () => {
  it("MarkdownをFrontmatterとContentに分離する", () => {
    const raw = `---
title: "Hello"
---
# Hello, world!

## Heading 2`;
    const result = extractFrontmatter(raw);
    expect(O.isSome(result)).toBe(true);
    if (O.isNone(result)) return;

    const { frontmatter, content } = result.value;
    expect(frontmatter).toEqual({ title: "Hello" });
    expect(content).toEqual("# Hello, world!\n\n## Heading 2");
  });
});
