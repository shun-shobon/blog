import Link from "next/link";

import { Heading } from "@/components/Heading";
import type { ArticleSummary } from "@/lib/markdown";

type Props = {
  summary: ArticleSummary;
};

export function ArticleCard({ summary }: Props): JSX.Element {
  return (
    <article key={summary.slug} className="grid gap-1">
      <Heading level={2}>
        <Link
          className="text-slate-800 dark:text-slate-200"
          // href={`/articles/${summary.slug}`}
          href="/"
        >
          {JSON.stringify(summary.title)}
        </Link>
      </Heading>
      <p>{summary.lead}</p>
    </article>
  );
}
