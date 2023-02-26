import { ArticleEmoji } from "@/components/ArticleEmoji";
import type { ArticleSummary } from "@/lib/markdown";

import styles from "./ArticleCard.module.css";
import { Heading } from "./ArticleCardHeading";
import { ArticleCardMeta } from "./ArticleCardMeta";

type Props = {
  summary: ArticleSummary;
};

export function ArticleCard({ summary }: Props): JSX.Element {
  return (
    <article key={summary.slug} className={styles.article}>
      <Heading slug={summary.slug}>{summary.title}</Heading>
      <ArticleEmoji className={styles.articleEmoji}>
        {summary.emoji}
      </ArticleEmoji>
      <ArticleCardMeta summary={summary} className={styles.articleMeta} />
      <p className={styles.articleLead}>{summary.lead}</p>
    </article>
  );
}
