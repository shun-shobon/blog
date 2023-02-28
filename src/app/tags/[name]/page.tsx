import type { Metadata } from "next";

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
  const name = decodeURIComponent(params.name);

  const summaries = await getArticleSummariesByTag(name);

  return (
    <main className={styles.main}>
      <Title>{name}の記事一覧</Title>
      {summaries.map((summary) => (
        <ArticleCard key={summary.slug} summary={summary} />
      ))}
    </main>
  );
}

export function generateMetadata({ params }: Props): Metadata {
  const tag = decodeURIComponent(params.name);

  return {
    title: `${tag}の記事一覧 | blog.s2n.tech`,
    openGraph: {
      title: `${tag}の記事一覧`,
      images: [
        {
          url: `https://blog.s2n.tech/api/ogp?title=${encodeURIComponent(
            `${tag}の記事一覧`,
          )}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Params[]> {
  const tags = await getAllTags();

  return tags.map((tag) => ({
    name: tag,
  }));
}
