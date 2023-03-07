import { ArticleEmoji } from "@/components/ArticleEmoji";
import { ArticleTags } from "@/components/ArticleTag";
import { Heading } from "@/components/markdown";
import type { Article } from "@/lib/plugins";

import styles from "./ArticleHeader.module.css";

type Props = {
  children: Article;
};

export function ArticleHeader({
  children: { title, footnotes, createdAt, updatedAt, tags, emoji },
}: Props): JSX.Element {
  return (
    <header className={styles.header}>
      <Heading footnoteDefs={footnotes} className={styles.heading}>
        {title}
      </Heading>
      <dl className={styles.meta}>
        <div className={styles.metaItem}>
          <dt>投稿日</dt>
          <dd>
            <time dateTime={createdAt}>{createdAt}</time>
          </dd>
        </div>
        {updatedAt && (
          <div className={styles.metaItem}>
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
              <ArticleTags>{tags}</ArticleTags>
            </dd>
          </div>
        )}
      </dl>
      <ArticleEmoji className={styles.emoji}>{emoji}</ArticleEmoji>
    </header>
  );
}
