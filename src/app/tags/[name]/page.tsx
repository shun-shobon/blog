import type { Metadata } from "next";
import { notFound } from "next/navigation";

import styles from "@/app/global.module.css";
import { ArticleCard } from "@/components/ArticleCard/ArticleCard";
import { Title } from "@/components/Title";
import { ORIGIN, TITLE } from "@/config";
import { fetchArticleDatabase, getArticlesByTag } from "@/lib/article";
import { createOgpImageUrl } from "@/lib/ogp-image";

interface Params {
  name: string;
}

interface Props {
  params: Params;
}

export default async function Page({ params }: Props): Promise<JSX.Element> {
  const name = decodeURIComponent(params.name);

  const database = await fetchArticleDatabase();
  const articles = getArticlesByTag(database, name);
  if (!articles) notFound();

  return (
    <main className={styles.generalLayout}>
      <Title>{name}の記事一覧</Title>
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} />
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
