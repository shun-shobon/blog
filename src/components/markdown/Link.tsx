import type {
  FootnoteDefinition as FootnoteDefinitionNode,
  Link as LinkNode,
} from "mdast";

import { Link as LinkComponent } from "@/components/Link";

import styles from "./markdown.module.css";
import { PhrasingContentList } from "./PhrasingContent";

interface Props {
  children: LinkNode;
  footnoteDefs: Array<FootnoteDefinitionNode>;
}

export function Link({
  children: { children, url, title },
  footnoteDefs,
}: Props): JSX.Element {
  return (
    <LinkComponent
      href={url}
      title={title ?? undefined}
      className={styles.link}
    >
      <PhrasingContentList footnoteDefs={footnoteDefs}>
        {children}
      </PhrasingContentList>
    </LinkComponent>
  );
}
