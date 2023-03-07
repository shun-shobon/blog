import type { BlockContent } from "mdast";
import Script from "next/script";

import { BlockContentList } from "@/components/markdown";
import type { Article } from "@/lib/plugins";

import { ArticleFooter } from "./ArticleFooter";
import { ArticleFootnote } from "./ArticleFootnote";
import { ArticleHeader } from "./ArticleHeader";

type Props = {
  children: Article;
};

export function Article({ children: article }: Props): JSX.Element {
  const [title, ...content] = article.children;

  return (
    <article aria-labelledby={title.identifier}>
      <ArticleHeader>{article}</ArticleHeader>
      <BlockContentList footnoteDefs={article.footnotes}>
        {content as BlockContent[]}
      </BlockContentList>
      <ArticleFootnote>{article.footnotes}</ArticleFootnote>
      <ArticleFooter plainTitle={article.plainTitle} slug={article.slug} />
      <Script
        src="https://platform.twitter.com/widgets.js"
        strategy="afterInteractive"
      />
    </article>
  );
}
