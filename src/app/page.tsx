import { Heading } from "@/components/Heading";
import { findArticles } from "@/lib/lib";

import { ArticleCard } from "./ArticleCard";

export default async function Page(): Promise<JSX.Element> {
  const summaries = await findArticles("test-articles");

  return (
    <main className="mx-auto flex max-w-screen-lg flex-col gap-4 px-6 py-4">
      <Heading level={1}>記事一覧</Heading>
      {summaries.map((summary) => (
        <ArticleCard key={summary.slug} summary={summary} />
      ))}
    </main>
  );
}
