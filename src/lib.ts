import * as path from "node:path";

import fg from "fast-glob";

export async function findArticles(basePath: string): Promise<string[]> {
  const pattern = path.join(basePath, "*", "README.md");

  const files = await fg(pattern);

  return files.map((file) => path.basename(path.dirname(file)));
}
