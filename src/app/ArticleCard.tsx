import { ArticleMatter } from "@/components/ArticleMatter";
import { Heading } from "@/components/Heading";
import { Link } from "@/components/Link";
import type { ArticleSummary } from "@/lib/lib";

type Props = {
  summary: ArticleSummary;
};

export function ArticleCard({ summary }: Props): JSX.Element {
  return (
    <article key={summary.slug} className="grid gap-1">
      <Heading level={2}>
        <Link
          internal
          className="text-slate-800 dark:text-slate-200"
          href={`/articles/${summary.slug}`}
        >
          {summary.title}
        </Link>
      </Heading>
      <aside>
        <ArticleMatter summary={summary} />
      </aside>
    </article>
  );
}
