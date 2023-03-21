import { Temporal } from "@js-temporal/polyfill";
import classNames from "classnames";
import type { BlockContent } from "mdast";
import Script from "next/script";
import type { Article as JsonLdArticle, WithContext } from "schema-dts";

import { BlockContentList } from "@/components/markdown";
import markdownStyles from "@/components/markdown/markdown.module.css";
import { createOgpImageUrl } from "@/lib/ogp-image";
import type { Article } from "@/lib/plugins";

import styles from "./Article.module.css";
import { ArticleFooter } from "./ArticleFooter";
import { ArticleFootnote } from "./ArticleFootnote";
import { ArticleHeader } from "./ArticleHeader";
import { ArticleToc } from "./ArticleToc";

type Props = {
  children: Article;
  nonce: string;
};

export function Article({ children: article, nonce }: Props): JSX.Element {
  const [title, ...content] = article.children;

  const jsonLd: WithContext<JsonLdArticle> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.plainTitle,
    abstract: article.lead,
    datePublished: Temporal.ZonedDateTime.from(article.createdAt).toString({
      timeZoneName: "never",
    }),
    ...(article.updatedAt
      ? {
          dateModified: Temporal.ZonedDateTime.from(article.updatedAt).toString(
            {
              timeZoneName: "never",
            },
          ),
        }
      : {}),
    image: createOgpImageUrl(article.plainTitle, article.emoji, article.tags)
      .href,
    author: {
      "@type": "Person",
      name: "Shuntaro Nishizawa",
      url: "https://s2n.tech",
    },
  };

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
      <script
        type="application/ld+json"
        nonce={nonce}
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        src="https://platform.twitter.com/widgets.js"
        strategy="afterInteractive"
      />
    </article>
  );
}
