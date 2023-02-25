import { Heading } from "@/components/Heading";
import { findArticleSlugs } from "@/lib/markdown";

import { ArticleCard } from "./ArticleCard";

export default async function Page(): Promise<JSX.Element> {
  const summaries = await findArticleSlugs("test-articles");

  return (
    <main className="mx-auto flex max-w-screen-lg flex-col gap-4 px-6 py-4">
      <Heading level={1}>記事一覧</Heading>
      {summaries.map((summary) => (
        <ArticleCard key={summary.slug} summary={summary} />
      ))}
    </main>
  );
}
