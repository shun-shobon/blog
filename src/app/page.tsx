import { ArticleCard } from "@/components/ArticleCard/ArticleCard";
import { getAllArticleSummaries } from "@/lib/article";

import styles from "./page.module.css";

export default async function Page(): Promise<JSX.Element> {
  const summaries = await getAllArticleSummaries();

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>記事一覧</h1>
      {summaries.map((summary) => (
        <ArticleCard key={summary.slug} summary={summary} />
      ))}
    </main>
  );
}
