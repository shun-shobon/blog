import type { BlockContent } from "mdast";

import { BlockContentList, Heading } from "@/components/markdown";
import type { Article } from "@/lib/plugins";

import styles from "./Article.module.css";

type Props = {
  children: Article;
};

export function Article({
  children: { children, footnotes },
}: Props): JSX.Element {
  const [title, ...content] = children;

  return (
    <article className={styles.article}>
      <Heading footnoteDefs={footnotes}>{title}</Heading>
      <BlockContentList footnoteDefs={footnotes}>
        {content as BlockContent[]}
      </BlockContentList>
    </article>
  );
}
