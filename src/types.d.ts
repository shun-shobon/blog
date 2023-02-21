import type { Embed } from "@/lib/unist-plugins/remark-embed";

declare module "mdast" {
  interface BlockContentMap {
    embed: Embed;
  }
}
