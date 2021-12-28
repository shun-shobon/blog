import * as O from "fp-ts/Option";
import YAML from "yaml";

type Frontmatter = {
  frontmatter: unknown;
  content: string;
};

export function extractFrontmatter(raw: string): O.Option<Frontmatter> {
  const regexp = /^---\n(.+?)\n---\n(.+)/;
  const [, rawFrontmatter, content] = regexp.exec(raw) ?? [];

  if (rawFrontmatter == null || content == null) return O.none;

  const frontmatter: unknown = YAML.parse(rawFrontmatter);
  return O.some({ frontmatter, content });
}
