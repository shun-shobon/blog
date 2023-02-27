import { ArticleCard } from "@/components/ArticleCard/ArticleCard";
import { Title } from "@/components/Title";
import { getAllTags, getArticleSummariesByTag } from "@/lib/article";

import styles from "./page.module.css";

type Params = {
  name: string;
};

type Props = {
  params: Params;
};

export default async function Page({ params }: Props): Promise<JSX.Element> {
  const summaries = await getArticleSummariesByTag(params.name);

  return (
    <main className={styles.main}>
      <Title>{params.name}の記事一覧</Title>
      {summaries.map((summary) => (
        <ArticleCard key={summary.slug} summary={summary} />
      ))}
    </main>
  );
}

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Params[]> {
  const tags = await getAllTags();

  return tags.map((tag) => ({
    name: tag,
  }));
}
