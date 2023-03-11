import { Temporal } from "@js-temporal/polyfill";
import { getServerSideSitemap } from "next-sitemap";
import type { ISitemapField } from "next-sitemap/dist/@types/interface";

import { TITLE } from "@/config";
import { getAllArticleSummaries, getAllTags } from "@/lib/article";
import { createOgpImageUrl } from "@/lib/ogp-image";
import { getArticleUrl, getTagUrl, getUrl } from "@/lib/utils";

export async function GET() {
  const summaries = await getAllArticleSummaries();
  const tags = await getAllTags();

  const topFiled: ISitemapField = {
    loc: getUrl("/").href,
    lastmod:
      summaries[0]?.updatedAt ??
      summaries[0]?.createdAt ??
      Temporal.Now.plainDateISO("Asia/Tokyo").toString(),
    changefreq: "daily",
    priority: 0.6,
    images: [
      {
        loc: createOgpImageUrl(),
      },
    ],
  };

  const articleFields = summaries.map(
    (summary): ISitemapField => ({
      loc: getArticleUrl(summary.slug).href,
      lastmod: summary.updatedAt ?? summary.createdAt,
      changefreq: "weekly",
      priority: 0.8,
      images: [
        {
          // HACK: https://github.com/iamvishnusankar/next-sitemap/pull/598
          loc: createOgpImageUrl(
            summary.plainTitle,
            // summary.emoji,
            // summary.tags,
          ),
        },
      ],
      ...(Temporal.PlainDate.from(summary.createdAt).until(
        Temporal.Now.plainDateISO("Asia/Tokyo"),
      ).days < 2
        ? {
            news: {
              title: summary.plainTitle,
              date: summary.createdAt,
              publicationLanguage: "ja-JP",
              publicationName: TITLE,
            },
          }
        : {}),
    }),
  );

  const tagFields = tags.map(
    (tag): ISitemapField => ({
      loc: getTagUrl(tag).href,
      lastmod: Temporal.Now.plainDateTimeISO("Asia/Tokyo").toString(),
      changefreq: "daily",
      priority: 0.5,
      images: [
        {
          loc: createOgpImageUrl(`${tag}の記事一覧`),
        },
      ],
    }),
  );

  return getServerSideSitemap([topFiled, ...articleFields, ...tagFields]);
}
