import { ArticleTags } from "@/components/ArticleTag";
import type { Article } from "@/lib/plugins";

import styles from "./ArticleMeta.module.css";

type Props = {
  children: Article;
};

export function ArticleMeta({
  children: { createdAt, updatedAt, tags },
}: Props): JSX.Element {
  return (
    <header>
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
