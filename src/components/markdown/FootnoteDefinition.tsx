import classNames from "classnames";
import type { BlockContent, FootnoteDefinition } from "mdast";

import { BlockContentList } from "@/components/markdown";
import {
  getFootnoteDefId,
  getFootnoteRefId,
} from "@/components/markdown/utils";

import styles from "./markdown.module.css";

interface Props {
  idx: number;
  footnoteDefs: Array<FootnoteDefinition>;
  children: FootnoteDefinition;
}

export function FootnoteDefinition({
  children: { children },
  footnoteDefs,
  idx,
}: Props): JSX.Element {
  return (
    <li key={idx} id={getFootnoteDefId(idx)}>
      <div className={styles.footnoteDefinition}>
        <BlockContentList footnoteDefs={footnoteDefs}>
          {children as Array<BlockContent>}
        </BlockContentList>
        <a
          href={`#${getFootnoteRefId(idx)}`}
          aria-label="Back to content"
          className={classNames(styles.link, styles.footnoteDefinitionLink)}
        >
          ↵
        </a>
      </div>
    </li>
  );
}
