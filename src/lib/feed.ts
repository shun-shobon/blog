import { Temporal } from "@js-temporal/polyfill";
import { Feed } from "feed";

import { getAllArticleSummaries, getAllTags } from "@/lib/article";

import { createOgpImageUrl } from "./ogp-image";

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
    title: "blog.s2n.tech",
    description:
      "しゅん🌙(@shun_shobon)のブログサイトです。技術記事からポエムまで色々書きます。",
    id: "https://blog.s2n.tech/",
    link: "https://blog.s2n.tech/",
    language: "ja-JP",
    favicon: "https://blog.s2n.tech/favicon.ico",
    copyright: "Copyright © 2023 Shuntaro Nishizawa (しゅん🌙)",
    updated,
    feedLinks: {
      json: "https://example.com/json",
      atom: "https://example.com/atom",
    },
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
      id: `https://blog.s2n.tech/articles/${summary.slug}`,
      link: `https://blog.s2n.tech/articles/${summary.slug}`,
      image: {
        url: createOgpImageUrl(summary.plainTitle, summary.createdAt),
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
