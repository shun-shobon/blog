import type { Metadata } from "next";

import styles from "@/app/global.module.css";
import { ArticleCard } from "@/components/ArticleCard/ArticleCard";
import { Title } from "@/components/Title";
import { TITLE } from "@/config";
import { fetchArticleDatabase, getAllArticles } from "@/lib/article";

export default async function Page(): Promise<JSX.Element> {
  const database = await fetchArticleDatabase();
  const articles = getAllArticles(database);

  return (
    <main className={styles.generalLayout}>
      <Title>記事一覧</Title>
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </main>
  );
}

export const metadata: Metadata = {
  title: `ホーム | ${TITLE}`,
};
