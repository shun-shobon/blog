import { Temporal } from "@js-temporal/polyfill";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { ORIGIN, TITLE } from "@/config";
import { fetchArticleDatabase, getArticle } from "@/lib/article";
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
  const database = await fetchArticleDatabase();
  const article = getArticle(database, params.slug);
  if (!article) notFound();
  const nonce = headers().get("X-CSP-Nonce") ?? "";

  return (
    <main className={styles.main}>
      <Article nonce={nonce}>{article}</Article>
    </main>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const database = await fetchArticleDatabase();
  const article = getArticle(database, params.slug);
  if (!article) notFound();

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
      publishedTime: Temporal.ZonedDateTime.from(article.createdAt).toString({
        timeZoneName: "never",
      }),
      modifiedTime: article.updatedAt
        ? Temporal.ZonedDateTime.from(article.updatedAt).toString({
            timeZoneName: "never",
          })
        : undefined,
      authors: "しゅん🌙 (@shun_shobon)",
      tags: article.tags,
    },
  };
}
