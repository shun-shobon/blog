import type { Metadata } from "next";

import { ArticleCard } from "@/components/ArticleCard/ArticleCard";
import { Title } from "@/components/Title";
import { TITLE } from "@/config";
import { getAllArticleSummaries } from "@/lib/article";

import styles from "./page.module.css";

export default async function Page(): Promise<JSX.Element> {
  const summaries = await getAllArticleSummaries();

  return (
    <main className={styles.main}>
      <Title>記事一覧</Title>
      {summaries.map((summary) => (
        <ArticleCard key={summary.slug} summary={summary} />
      ))}
    </main>
  );
}

export const metadata: Metadata = {
  title: `ホーム | ${TITLE}`,
};
