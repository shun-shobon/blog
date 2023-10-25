import type { MetadataRoute } from "next";
import { Temporal } from "temporal-polyfill";

import { fetchArticleDatabase, getAllArticles } from "@/lib/article";
import { getArticleUrl, getTagUrl, getUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const database = await fetchArticleDatabase();
  const articles = getAllArticles(database);

  const top = createEntry(
    getUrl("/"),
    articles[0]?.updatedAt ?? articles[0]?.createdAt,
  );
  const tags = createEntry(
    getUrl("/tags"),
    articles[0]?.updatedAt ?? articles[0]?.createdAt,
  );
  const articleEntiries = articles.map((article) =>
    createEntry(
      getArticleUrl(article.slug),
      article.updatedAt ?? article.createdAt,
    ),
  );
  const tagEntries = Array.from(database.tags.entries()).map(
    ([name, articles]) =>
      createEntry(
        getTagUrl(name),
        articles[0]?.updatedAt ?? articles[0]?.createdAt,
      ),
  );

  return [top, tags, ...articleEntiries, ...tagEntries];
}

type Entry = MetadataRoute.Sitemap extends Array<infer T> ? T : never;

function createEntry(path: URL, lastModefied?: string): Entry {
  return {
    url: path.href,
    lastModified:
      lastModefied != null
        ? Temporal.ZonedDateTime.from(lastModefied).toString({
            timeZoneName: "never",
          })
        : undefined,
  };
}
