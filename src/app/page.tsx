import { ArticleCard } from "@/components/ArticleCard/ArticleCard";
import type { ArticleSummaries, ArticleSummary } from "@/lib/markdown";

import styles from "./page.module.css";

async function getArticleSummaries(): Promise<ArticleSummary[]> {
  return ((await import("data/__summaries__.json")) as ArticleSummaries)
    .summaries;
}

export default async function Page(): Promise<JSX.Element> {
  const summaries = await getArticleSummaries();

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>記事一覧</h1>
      {summaries.map((summary) => (
        <ArticleCard key={summary.slug} summary={summary} />
      ))}
    </main>
  );
}
