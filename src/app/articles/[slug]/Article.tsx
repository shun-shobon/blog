import type { BlockContent } from "mdast";

import { BlockContentList, Heading } from "@/components/markdown";
import type { Article } from "@/lib/plugins";

import styles from "./Article.module.css";
import { ArticleFootnote } from "./ArticleFootnote";
import { ArticleMeta } from "./ArticleMeta";

type Props = {
  children: Article;
};

export function Article({ children: article }: Props): JSX.Element {
  const [title, ...content] = article.children;

  return (
    <article className={styles.article} aria-labelledby={title.identifier}>
      <Heading footnoteDefs={article.footnotes}>{title}</Heading>
      <ArticleMeta>{article}</ArticleMeta>
      <BlockContentList footnoteDefs={article.footnotes}>
        {content as BlockContent[]}
      </BlockContentList>
      <ArticleFootnote>{article.footnotes}</ArticleFootnote>
    </article>
  );
}
