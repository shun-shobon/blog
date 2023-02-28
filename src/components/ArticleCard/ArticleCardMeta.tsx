import type { ArticleSummary } from "@/lib/markdown";

import { ArticleTags } from "../ArticleTag";
import styles from "./ArticleCardMeta.module.css";

type Props = {
  summary: ArticleSummary;
  className?: string | undefined;
};

export function ArticleCardMeta({ summary, className }: Props): JSX.Element {
  return (
    <header className={className}>
      <dl className={styles.list}>
        <dt className={styles.srOnly}>Posted at</dt>
        <dd>
          <time dateTime={summary.createdAt}>{summary.createdAt}</time>
        </dd>
        {summary.tags.length > 0 && (
          <>
            <dt className={styles.srOnly}>Tags</dt>
            <dd>
              <ArticleTags>{summary.tags}</ArticleTags>
            </dd>
          </>
        )}
      </dl>
    </header>
  );
}
