import { ArticleCard } from "@/components/ArticleCard";
import type { Article } from "@/lib/plugins";

import styles from "./ReadNext.module.css";

interface Props {
  nextArticles: Array<Article>;
}

export function ReadNext({ nextArticles }: Props): JSX.Element {
  return (
    <section className={styles.section}>
      <h2 className={styles.header}>Read next</h2>
      {nextArticles.map((article) => (
        <ArticleCard article={article} hideDescription key={article.slug} />
      ))}
    </section>
  );
}
