import { Temporal } from "@js-temporal/polyfill";
import type { Metadata } from "next";

import { getAllArticleSummaries, getArticle } from "@/lib/article";

import { Article } from "./Article";
import styles from "./page.module.css";

type Params = {
  slug: string;
};

type Props = {
  params: Params;
};

export default async function Page({ params }: Props): Promise<JSX.Element> {
  const article = await getArticle(params.slug);

  return (
    <main className={styles.main}>
      <Article>{article}</Article>
    </main>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticle(params.slug);

  return {
    title: article.plainTitle,
    description: article.lead,
    openGraph: {
      title: article.plainTitle,
      description: article.lead,
      images: [
        {
          url: `https://blog.s2n.tech/api/ogp?title=${encodeURIComponent(
            article.plainTitle,
          )}`,
          width: 1200,
          height: 630,
        },
      ],
      type: "article",
      publishedTime: Temporal.PlainDate.from(article.createdAt)
        .toZonedDateTime("Asia/Tokyo")
        .toString(),
      modifiedTime: article.updatedAt
        ? Temporal.PlainDate.from(article.updatedAt)
            .toZonedDateTime("Asia/Tokyo")
            .toString()
        : undefined,
      authors: "しゅん🌙 (@shun_shobon)",
      tags: article.tags,
    },
  };
}

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Params[]> {
  const summaries = await getAllArticleSummaries();

  return summaries.map((summary) => ({
    slug: summary.slug,
  }));
}
