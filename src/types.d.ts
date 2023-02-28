import type {
  DescriptionDescription,
  DescriptionList,
  DescriptionTerm,
  Embed,
  LocalImage,
  Section,
} from "@/lib/plugins";

declare module "mdast" {
  interface BlockContentMap {
    embed: Embed;
    section: Section;
    descriptionList: DescriptionList;
  }

  interface StaticPhrasingContentMap {
    localImage: LocalImage;
  }

  // HACK: `DescriptionTerm` and `DescriptionDescription` are not `DefinitionContent` but they are `Content` in mdast
  interface DefinitionContentMap {
    descriptionTerm: DescriptionTerm;
    descriptionDescription: DescriptionDescription;
  }

  interface Heading {
    identifier?: string;
  }
}
