import { ArticleEmoji } from "@/components/ArticleEmoji";
import type { Article } from "@/lib/plugins";

import { Twemoji } from "../Twemoji";
import styles from "./ArticleCard.module.css";
import { Heading } from "./ArticleCardHeading";
import { ArticleCardMeta } from "./ArticleCardMeta";

type Props = {
  article: Article;
};

export function ArticleCard({ article }: Props): JSX.Element {
  return (
    <article
      key={article.slug}
      className={styles.article}
      aria-labelledby={article.title.identifier}
    >
      <Heading slug={article.slug}>{article.title}</Heading>
      <ArticleEmoji className={styles.articleEmoji}>
        {article.emoji}
      </ArticleEmoji>
      <ArticleCardMeta article={article} className={styles.articleMeta} />
      <p className={styles.articleLead}>
        <Twemoji>{article.lead}</Twemoji>
      </p>
    </article>
  );
}
