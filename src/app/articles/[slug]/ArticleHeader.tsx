import { ArticleTags } from "@/components/ArticleTag";
import { Heading } from "@/components/markdown";
import type { Article } from "@/lib/plugins";

import styles from "./ArticleHeader.module.css";

type Props = {
  children: Article;
};

export function ArticleHeader({
  children: { title, footnotes, createdAt, updatedAt, tags },
}: Props): JSX.Element {
  return (
    <header>
      <Heading footnoteDefs={footnotes}>{title}</Heading>
      <dl className={styles.articleMeta}>
        <div className={styles.articleMetaItem}>
          <dt>投稿日</dt>
          <dd>
            <time dateTime={createdAt}>{createdAt}</time>
          </dd>
        </div>
        {updatedAt && (
          <div className={styles.articleMetaItem}>
            <dt>更新日</dt>
            <dd>
              <time dateTime={updatedAt}>{updatedAt}</time>
            </dd>
          </div>
        )}
        {tags.length > 0 && (
          <div className={styles.box}>
            <dt className={styles.srOnly}>タグ</dt>
            <dd>
              <ArticleTags className={styles.tags}>{tags}</ArticleTags>
            </dd>
          </div>
        )}
      </dl>
    </header>
  );
}
