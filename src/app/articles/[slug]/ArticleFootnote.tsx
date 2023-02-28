import type { BlockContent, FootnoteDefinition } from "mdast";

import { BlockContentList } from "@/components/markdown";
import {
  getFootnoteDefId,
  getFootnoteRefId,
} from "@/components/markdown/utils";

import styles from "./ArticleFootnote.module.css";

type Props = {
  children: FootnoteDefinition[];
};

export function ArticleFootnote({
  children: footnoteDefs,
}: Props): JSX.Element | null {
  if (footnoteDefs.length === 0) {
    return null;
  }

  return (
    <>
      <hr />
      <section aria-labelledby="footnote">
        <h2 id="footnote" className={styles.srOnly}>
          脚注
        </h2>
        <ol>
          {footnoteDefs.map((footnote, idx) => (
            <Footnote key={idx} footnoteDefs={footnoteDefs} idx={idx + 1}>
              {footnote}
            </Footnote>
          ))}
        </ol>
      </section>
    </>
  );
}

type FootnoteProps = {
  idx: number;
  footnoteDefs: FootnoteDefinition[];
  children: FootnoteDefinition;
};

function Footnote({
  children: { children },
  footnoteDefs,
  idx,
}: FootnoteProps): JSX.Element {
  return (
    <li key={idx} id={getFootnoteDefId(idx)}>
      <div className={styles.footnote}>
        <BlockContentList footnoteDefs={footnoteDefs}>
          {children as BlockContent[]}
        </BlockContentList>
        <a
          href={`#${getFootnoteRefId(idx)}`}
          aria-label="Back to content"
          className={styles.footnoteLink}
        >
          ↵
        </a>
      </div>
    </li>
  );
}
