import { Temporal } from "@js-temporal/polyfill";
import classNames from "classnames";

import { ArticleEmoji } from "@/components/ArticleEmoji";
import { ArticleTags } from "@/components/ArticleTag";
import { Heading } from "@/components/markdown";
import type { Article } from "@/lib/plugins";

import styles from "./ArticleHeader.module.css";

interface Props {
  children: Article;
  className?: string | undefined;
}

export function ArticleHeader({
  children: { title, footnotes, createdAt, updatedAt, tags, emoji },
  className,
}: Props): JSX.Element {
  return (
    <header className={classNames(styles.header, className)}>
      <Heading footnoteDefs={footnotes} className={styles.heading}>
        {title}
      </Heading>
      <dl className={styles.meta}>
        <div className={styles.metaItem}>
          <dt>投稿日</dt>
          <dd>
            <time
              dateTime={Temporal.ZonedDateTime.from(createdAt).toString({
                timeZoneName: "never",
              })}
            >
              {Temporal.ZonedDateTime.from(createdAt)
                .toPlainDate()
                .toLocaleString("ja-JP")}
            </time>
          </dd>
        </div>
        {updatedAt != null && (
          <div className={styles.metaItem}>
            <dt>更新日</dt>
            <dd>
              <time
                dateTime={Temporal.ZonedDateTime.from(updatedAt).toString({
                  timeZoneName: "never",
                })}
              >
                {Temporal.ZonedDateTime.from(updatedAt)
                  .toPlainDate()
                  .toLocaleString("ja-JP")}
              </time>
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
      <ArticleEmoji className={styles.emoji}>{emoji}</ArticleEmoji>
    </header>
  );
}
