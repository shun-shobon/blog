import { Temporal } from "@js-temporal/polyfill";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ORIGIN, TITLE } from "@/config";
import { getArticle } from "@/lib/article";
import { createOgpImageUrl } from "@/lib/ogp-image";

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
  if (!article) {
    notFound();
  }

  return (
    <main className={styles.main}>
      <Article>{article}</Article>
    </main>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticle(params.slug);
  if (!article) {
    notFound();
  }

  return {
    title: article.plainTitle,
    description: article.lead,
    openGraph: {
      title: article.plainTitle,
      description: article.lead,
      url: ORIGIN,
      siteName: TITLE,
      locale: "ja-JP",
      images: createOgpImageUrl(
        article.plainTitle,
        article.emoji,
        article.tags,
      ),
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
