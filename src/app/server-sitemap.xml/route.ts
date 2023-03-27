import { Temporal } from "@js-temporal/polyfill";
import { getServerSideSitemap } from "next-sitemap";
import type { ISitemapField } from "next-sitemap/dist/@types/interface";

import { TITLE } from "@/config";
import { fetchArticleDatabase, getAllArticles } from "@/lib/article";
import { createOgpImageUrl } from "@/lib/ogp-image";
import { getArticleUrl, getTagUrl, getUrl } from "@/lib/utils";

export async function GET(): Promise<Response> {
  const database = await fetchArticleDatabase();
  const articles = getAllArticles(database);

  const topFiled: ISitemapField = {
    loc: getUrl("/").href,
    lastmod: Temporal.ZonedDateTime.from(
      articles[0]?.updatedAt ??
        articles[0]?.createdAt ??
        Temporal.Now.zonedDateTimeISO("Asia/Tokyo"),
    ).toString({ timeZoneName: "never" }),
    changefreq: "daily",
    priority: 0.6,
    images: [
      {
        loc: createOgpImageUrl(),
      },
    ],
  };

  const articleFields = articles.map(
    (article): ISitemapField => ({
      loc: getArticleUrl(article.slug).href,
      lastmod: Temporal.ZonedDateTime.from(
        article.updatedAt ?? article.createdAt,
      ).toString({ timeZoneName: "never" }),
      changefreq: "weekly",
      priority: 0.8,
      images: [
        {
          // HACK: https://github.com/iamvishnusankar/next-sitemap/pull/598
          loc: createOgpImageUrl(
            article.plainTitle,
            // summary.emoji,
            // summary.tags,
          ),
        },
      ],
      ...(Temporal.ZonedDateTime.from(article.createdAt).until(
        Temporal.Now.zonedDateTimeISO("Asia/Tokyo"),
      ).days < 2
        ? {
            news: {
              title: article.plainTitle,
              date: Temporal.ZonedDateTime.from(article.createdAt).toString({
                timeZoneName: "never",
              }),
              publicationLanguage: "ja-JP",
              publicationName: TITLE,
            },
          }
        : {}),
    }),
  );

  const tagFields = Array.from(database.tags.entries()).map(
    ([name, articles]): ISitemapField => ({
      loc: getTagUrl(name).href,
      lastmod: Temporal.ZonedDateTime.from(
        articles[0]?.updatedAt ??
          articles[0]?.createdAt ??
          Temporal.Now.zonedDateTimeISO("Asia/Tokyo"),
      ).toString({ timeZoneName: "never" }),
      changefreq: "daily",
      priority: 0.5,
      images: [
        {
          loc: createOgpImageUrl(`${name}の記事一覧`),
        },
      ],
    }),
  );

  return getServerSideSitemap([topFiled, ...articleFields, ...tagFields]);
}
