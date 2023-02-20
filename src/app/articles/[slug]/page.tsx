import { ArticleMatter } from "@/components/ArticleMatter";
import { Heading } from "@/components/Heading";
import { readArticle } from "@/lib";

type Props = {
  params: {
    slug: string;
  };
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
      </article>
    </main>
  );
}
