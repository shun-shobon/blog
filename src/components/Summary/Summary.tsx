import { remark } from "remark";
import stripMarkdown from "strip-markdown";

import { type Article } from "../../lib/blog";

export type Props = {
  article: Article;
};

export const Summary = ({ article }: Props): JSX.Element => {
  const summary = remark()
    .use(stripMarkdown)
    .processSync(article.contents)
    .toString()
    .slice(0, 200)
    .concat("...");

  return (
    <article>
      <h2 className="text-xl text-cyan-500">
        <a
          href={`articles/${article.slug}`}
          className="cursor-pointer hover:underline decoration-current"
        >
          {article.title}
        </a>
      </h2>
      <p className="text-gray-500 flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <span key={tag}>#{tag}</span>
        ))}
      </p>
      <p>{summary}</p>
    </article>
  );
};
