import { Temporal } from "@js-temporal/polyfill";
import { Feed } from "feed";

import { ORIGIN, TITLE } from "@/config";
import { fetchArticleDatabase, getAllArticles } from "@/lib/article";

import { createOgpImageUrl } from "./ogp-image";
import { getArticleUrl, getUrl } from "./utils";

export async function generateFeed(): Promise<Feed> {
  const database = await fetchArticleDatabase();
  const articles = getAllArticles(database);

  const lastUpdated = articles[0]?.updatedAt ?? articles[0]?.createdAt;
  const updated =
    lastUpdated != null
      ? new Date(
          Temporal.ZonedDateTime.from(
            lastUpdated,
          ).toInstant().epochMilliseconds,
        )
      : new Date(Temporal.Now.instant().epochMilliseconds);

  const feed = new Feed({
    title: TITLE,
    description:
      "しゅん🌙(@shun_shobon)のブログサイトです。技術記事からポエムまで色々書きます。",
    id: ORIGIN,
    link: ORIGIN,
    language: "ja-JP",
    favicon: getUrl("/favicon.ico").href,
    copyright: "Copyright © 2023 Shuntaro Nishizawa (しゅん🌙)",
    updated,
    author: {
      name: "Shuntaro Nishizawa (しゅん🌙)",
      link: "https://s2n.tech",
    },
  });

  articles.forEach((article) => {
    const date = new Date(
      Temporal.ZonedDateTime.from(
        article.updatedAt ?? article.createdAt,
      ).toInstant().epochMilliseconds,
    );
    const published = new Date(
      Temporal.ZonedDateTime.from(
        article.createdAt,
      ).toInstant().epochMilliseconds,
    );

    feed.addItem({
      title: article.plainTitle,
      id: getArticleUrl(article.slug).href,
      link: getArticleUrl(article.slug).href,
      image: {
        url: createOgpImageUrl(
          article.plainTitle,
          article.emoji,
          article.tags,
        ).toString(),
        type: "image/png",
      },
      description: article.lead,
      category: article.tags.map((tag) => ({ name: tag })),
      date,
      published,
    });
  });

  Array.from(database.tags.keys()).forEach((tag) => {
    feed.addCategory(tag);
  });

  return feed;
}
