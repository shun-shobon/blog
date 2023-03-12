import type { Article } from "@/lib/plugins";

import { ArticleTags } from "../ArticleTag";
import styles from "./ArticleCardMeta.module.css";

type Props = {
  article: Article;
  className?: string | undefined;
};

export function ArticleCardMeta({ article, className }: Props): JSX.Element {
  return (
    <header className={className}>
      <dl className={styles.list}>
        <dt className={styles.srOnly}>Posted at</dt>
        <dd>
          <time dateTime={article.createdAt}>{article.createdAt}</time>
        </dd>
        {article.tags.length > 0 && (
          <>
            <dt className={styles.srOnly}>Tags</dt>
            <dd>
              <ArticleTags>{article.tags}</ArticleTags>
            </dd>
          </>
        )}
      </dl>
    </header>
  );
}
