import { Temporal } from "@js-temporal/polyfill";
import { Feed } from "feed";

import { ORIGIN, TITLE } from "@/config";
import { getAllArticleSummaries, getAllTags } from "@/lib/article";

import { createOgpImageUrl } from "./ogp-image";
import { getArticleUrl, getUrl } from "./utils";

export async function generateFeed(): Promise<Feed> {
  const summaries = await getAllArticleSummaries();
  const tags = await getAllTags();

  const lastUpdated = summaries[0]?.updatedAt ?? summaries[0]?.createdAt;
  const updated = lastUpdated
    ? new Date(
        Temporal.PlainDateTime.from(lastUpdated)
          .toZonedDateTime("Asia/Tokyo")
          .toInstant().epochMilliseconds,
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

  summaries.forEach((summary) => {
    const date = new Date(
      Temporal.PlainDateTime.from(summary.updatedAt ?? summary.createdAt)
        .toZonedDateTime("Asia/Tokyo")
        .toInstant().epochMilliseconds,
    );
    const published = new Date(
      Temporal.PlainDateTime.from(summary.createdAt)
        .toZonedDateTime("Asia/Tokyo")
        .toInstant().epochMilliseconds,
    );

    feed.addItem({
      title: summary.plainTitle,
      id: getArticleUrl(summary.slug).href,
      link: getArticleUrl(summary.slug).href,
      image: {
        url: createOgpImageUrl(summary.plainTitle, summary.tags),
        type: "image/png",
      },
      description: summary.lead,
      category: summary.tags.map((tag) => ({ name: tag })),
      date,
      published,
    });
  });

  tags.forEach((tag) => {
    feed.addCategory(tag);
  });

  return feed;
}
