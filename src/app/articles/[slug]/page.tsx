import { ArticleMatter } from "@/components/ArticleMatter";
import { Heading } from "@/components/Heading";
import { findArticles, readArticle } from "@/lib";

import { ArticleContent, ArticleFootnotes } from "./ArticleContent";

type Params = {
  slug: string;
};

type Props = {
  params: Params;
};

export default async function Page({ params }: Props): Promise<JSX.Element> {
  const article = await readArticle("test-articles", params.slug);

  return (
    <main>
      <article className="mx-auto max-w-screen-lg space-y-2 px-6 py-4">
        <Heading level={1}>{article.title}</Heading>
        <header>
          <ArticleMatter summary={article} />
        </header>
        <ArticleContent content={article.content.children} />
        <ArticleFootnotes footnotes={article.content.footnotes} />
      </article>
    </main>
  );
}

export async function generateStaticParams(): Promise<Params[]> {
  const articleSummaries = await findArticles("test-articles");

  return articleSummaries.map((summary) => ({
    slug: summary.slug,
  }));
}
