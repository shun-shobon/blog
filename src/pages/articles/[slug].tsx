import { type NextPage, type GetStaticProps, type GetStaticPaths } from "next";
import { format } from "date-fns";
import { remark } from "remark";
import stripMarkdown from "strip-markdown";
import * as E from "fp-ts/Either";

import { type Article, fetchArticles } from "../../lib/blog";
import { getConfig } from "../../config";

import { Layout } from "../../components/Layout";
import { Markdown } from "../../components/Markdown";

type Props = {
  article: Article;
};

const Article: NextPage<Props> = ({ article }) => {
  const description = remark()
    .use(stripMarkdown)
    .processSync(article.contents)
    .toString()
    .slice(0, 100);

  return (
    <Layout title={article.title} description={description}>
      <main className="w-full max-w-[80ch] mx-auto px-4 py-12 grid gap-8">
        <div>
          <h1 className="text-3xl text-cyan-500 font-medium">
            {article.title}
          </h1>
          <p className="text-gray-500 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </p>
          <p className="text-gray-500 text-right">
            {format(new Date(article.postedAt), "yyyy年MM月dd日")}
          </p>
        </div>
        <section className="w-full overflow-x-auto">
          <Markdown contents={article.contents} />
        </section>
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.["slug"];
  if (typeof slug !== "string") return { notFound: true };

  const { articlePath } = getConfig();

  const eitherArticles = await fetchArticles(articlePath);
  if (E.isLeft(eitherArticles)) throw new Error("Failed to fetch articles");

  const articles = eitherArticles.right;

  const article = articles.find((article) => article.slug === slug);
  if (typeof article === "undefined") return { notFound: true };

  return {
    props: {
      article,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { articlePath } = getConfig();

  const eitherArticles = await fetchArticles(articlePath);
  if (E.isLeft(eitherArticles)) throw new Error("Failed to fetch articles");

  const articles = eitherArticles.right;

  const slugs = articles.map(({ slug }) => slug);

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: "blocking",
  };
};

export default Article;
