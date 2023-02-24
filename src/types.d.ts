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

  interface RowContentMap {
    descriptionTerm: DescriptionTerm;
    descriptionDescription: DescriptionDescription;
  }

  interface Heading {
    identifier?: string;
  }
}
