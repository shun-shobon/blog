import fg from "fast-glob";

export function getArticlePath(basePath: string): Promise<string[]> {
  return fg("*/*.md", {
    cwd: basePath,
  }).then((x) => x.sort());
}
