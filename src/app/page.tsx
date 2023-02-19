import { findArticles } from "@/lib";

import { ArticleCard } from "./ArticleCard";

export default async function Page(): Promise<JSX.Element> {
  const summaries = await findArticles("test-articles");

  return (
    <main className="mx-auto flex max-w-screen-lg flex-col gap-4 px-6 py-4">
      <h1 className="text-4xl font-bold text-purple-700 dark:text-slate-200">
        記事一覧
      </h1>
      {summaries.map((summary) => (
        <ArticleCard key={summary.slug} summary={summary} />
      ))}
    </main>
  );
}
