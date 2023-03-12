import type { Metadata } from "next";

import globalStyles from "@/app/global.module.css";
import { ArticleTags } from "@/components/ArticleTag";
import { Title } from "@/components/Title";
import { ORIGIN, TITLE } from "@/config";
import { fetchArticleDatabase } from "@/lib/article";
import { createOgpImageUrl } from "@/lib/ogp-image";

import styles from "./page.module.css";

export default async function Page(): Promise<JSX.Element> {
  const database = await fetchArticleDatabase();

  return (
    <main className={globalStyles.generalLayout}>
      <Title>タグ一覧</Title>
      <ArticleTags className={styles.tags}>{database.tags}</ArticleTags>
    </main>
  );
}

export function generateMetadata(): Metadata {
  return {
    title: `タグ一覧 | ${TITLE}`,
    openGraph: {
      title: "タグ一覧",
      url: ORIGIN,
      siteName: TITLE,
      locale: "ja-JP",
      type: "website",
      images: createOgpImageUrl("タグ一覧"),
    },
  };
}
