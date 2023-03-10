import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleCard } from "@/components/ArticleCard/ArticleCard";
import { Title } from "@/components/Title";
import { ORIGIN, TITLE } from "@/config";
import { getArticleSummariesByTag } from "@/lib/article";
import { createOgpImageUrl } from "@/lib/ogp-image";

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
  if (summaries.length === 0) {
    notFound();
  }

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
    title: `${tag}の記事一覧 | ${TITLE}`,
    openGraph: {
      title: `${tag}の記事一覧`,
      url: ORIGIN,
      siteName: TITLE,
      locale: "ja-JP",
      type: "website",
      images: createOgpImageUrl(`${tag}の記事一覧`),
    },
  };
}
