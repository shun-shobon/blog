import type { Embed, Section } from "@/lib/unist-plugins";

declare module "mdast" {
  interface BlockContentMap {
    embed: Embed;
    section: Section;
  }
}
