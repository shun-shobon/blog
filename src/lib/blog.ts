import * as path from "node:path";

import glob from "fast-glob";

import { getConfig } from "./config";

async function findArticles() {
  const { articlesPath } = getConfig();
  const articles = await glob(path.join(articlesPath, "*/main.md"));
}
