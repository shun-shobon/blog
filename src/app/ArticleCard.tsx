import type { Heading as HeadingNode } from "mdast";
import Link from "next/link";

import { PhrasingContentList } from "@/components/markdown";
import type { ArticleSummary } from "@/lib/markdown";

type Props = {
  summary: ArticleSummary;
};

export function ArticleCard({ summary }: Props): JSX.Element {
  return (
    <article key={summary.slug} className="grid gap-1">
      <Link href={`/articles/${summary.slug}`} prefetch={false}>
        <Heading>{summary.title}</Heading>
      </Link>
      <p>{summary.lead}</p>
    </article>
  );
}

type HeadingProps = {
  children: HeadingNode;
};
function Heading({ children: { children } }: HeadingProps): JSX.Element {
  return (
    <h2>
      <PhrasingContentList footnoteDefs={[]}>{children}</PhrasingContentList>
    </h2>
  );
}
