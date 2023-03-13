import classNames from "classnames";
import type { BlockContent } from "mdast";
import Script from "next/script";

import { BlockContentList } from "@/components/markdown";
import markdownStyles from "@/components/markdown/markdown.module.css";
import type { Article } from "@/lib/plugins";

import styles from "./Article.module.css";
import { ArticleFooter } from "./ArticleFooter";
import { ArticleFootnote } from "./ArticleFootnote";
import { ArticleHeader } from "./ArticleHeader";
import { ArticleToc } from "./ArticleToc";

type Props = {
  children: Article;
};

export function Article({ children: article }: Props): JSX.Element {
  const [title, ...content] = article.children;

  return (
    <article aria-labelledby={title.identifier} className={styles.article}>
      <ArticleHeader>{article}</ArticleHeader>
      <div className={styles.main}>
        <ArticleToc article={article} className={styles.aside} />
        <div className={classNames(markdownStyles.root, styles.content)}>
          <BlockContentList footnoteDefs={article.footnotes}>
            {content as BlockContent[]}
          </BlockContentList>
          <ArticleFootnote>{article.footnotes}</ArticleFootnote>
          <ArticleFooter plainTitle={article.plainTitle} slug={article.slug} />
        </div>
      </div>
      <Script
        src="https://platform.twitter.com/widgets.js"
        strategy="afterInteractive"
      />
    </article>
  );
}
