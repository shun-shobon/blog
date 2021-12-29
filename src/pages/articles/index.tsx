import { type NextPage, type GetStaticProps } from "next";
import * as E from "fp-ts/Either";

import { type Article, fetchArticles } from "../../lib/blog";
import { getConfig } from "../../config";

import { Layout } from "../../components/Layout";
import { Summary } from "../../components/Summary";

type Props = {
  articles: Article[];
};

const Index: NextPage<Props> = ({ articles }) => {
  return (
    <Layout>
      <main className="container mx-auto p-4 grid gap-4">
        {articles.map((article) => (
          <Summary key={article.slug} article={article} />
        ))}
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { articlePath } = getConfig();

  const eitherArticles = await fetchArticles(articlePath);
  if (E.isLeft(eitherArticles)) throw new Error("Failed to fetch articles");

  const articles = eitherArticles.right;

  return {
    props: {
      articles,
    },
  };
};

export default Index;
