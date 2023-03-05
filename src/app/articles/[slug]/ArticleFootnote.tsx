import type { FootnoteDefinition as FootnoteDefinitionNode } from "mdast";

import { FootnoteDefinitionList } from "@/components/markdown";

import styles from "./ArticleFootnote.module.css";

type Props = {
  children: FootnoteDefinitionNode[];
};

export function ArticleFootnote({
  children: footnoteDefs,
}: Props): JSX.Element | null {
  if (footnoteDefs.length === 0) {
    return null;
  }

  return (
    <>
      <hr className={styles.thematicBreak} />
      <section aria-labelledby="footnote">
        <h2 id="footnote" className={styles.srOnly}>
          脚注
        </h2>
        <FootnoteDefinitionList>{footnoteDefs}</FootnoteDefinitionList>
      </section>
    </>
  );
}
