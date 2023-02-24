import type {
  DescriptionDescription,
  DescriptionList,
  DescriptionTerm,
  Embed,
  Section,
} from "@/lib/plugins";

declare module "mdast" {
  interface BlockContentMap {
    embed: Embed;
    section: Section;
    descriptionList: DescriptionList;
  }

  interface RowContentMap {
    descriptionTerm: DescriptionTerm;
    descriptionDescription: DescriptionDescription;
  }

  interface Heading {
    identifier?: string;
  }
}
