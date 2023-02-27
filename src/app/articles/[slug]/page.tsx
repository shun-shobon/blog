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

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Params[]> {
  const summaries = await getAllArticleSummaries();

  return summaries.map((summary) => ({
    slug: summary.slug,
  }));
}
