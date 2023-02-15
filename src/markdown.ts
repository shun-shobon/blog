import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import { unified } from "unified";

export async function parseMarkdown(markdown: string) {
  const processor = unified().use(remarkParse).use(remarkGfm).use(remarkMath);

  const ast = await processor.parse(markdown);
  return ast;
}
