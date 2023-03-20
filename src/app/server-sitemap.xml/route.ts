import { Temporal } from "@js-temporal/polyfill";
import { getServerSideSitemap } from "next-sitemap";
import type { ISitemapField } from "next-sitemap/dist/@types/interface";

import { TITLE } from "@/config";
import { fetchArticleDatabase, getAllArticles } from "@/lib/article";
import { createOgpImageUrl } from "@/lib/ogp-image";
import { getArticleUrl, getTagUrl, getUrl } from "@/lib/utils";

export async function GET() {
  const database = await fetchArticleDatabase();
  const articles = getAllArticles(database);

  const topFiled: ISitemapField = {
    loc: getUrl("/").href,
    lastmod:
      articles[0]?.updatedAt ??
      articles[0]?.createdAt ??
      Temporal.Now.zonedDateTimeISO("Asia/Tokyo").toString(),
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
      lastmod: article.updatedAt ?? article.createdAt,
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
              date: article.createdAt,
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
      lastmod:
        articles[0]?.updatedAt ??
        articles[0]?.createdAt ??
        Temporal.Now.zonedDateTimeISO("Asia/Tokyo").toString(),
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
