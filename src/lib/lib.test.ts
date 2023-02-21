import { Temporal } from "@js-temporal/polyfill";
import { u } from "unist-builder";
import { assert, expect, test } from "vitest";

import { findArticles, readArticle } from "./lib";

test("findArticles", async () => {
  const articles = await findArticles("test-articles");
  const helloWorld = articles.find((a) => a.slug === "hello-world");
  const about = articles.find((a) => a.slug === "about");

  const helloWorldPostedAt = Temporal.PlainDate.from("2023-01-01");
  expect(helloWorld).toStrictEqual({
    title: "Hello, World!",
    slug: "hello-world",
    postedAt: helloWorldPostedAt,
    tags: ["hello", "world"],
  });
  assert(helloWorld?.postedAt.equals(helloWorldPostedAt));

  const aboutPostedAt = Temporal.PlainDate.from("2023-02-01");
  expect(about).toStrictEqual({
    title: "About",
    slug: "about",
    postedAt: aboutPostedAt,
    tags: [],
  });
  assert(about?.postedAt.equals(aboutPostedAt));
});

test("readArticle", async () => {
  const article = await readArticle("test-articles", "hello-world");
  expect(article).toStrictEqual({
    title: "Hello, World!",
    slug: "hello-world",
    postedAt: Temporal.PlainDate.from("2023-01-01"),
    tags: ["hello", "world"],
    content: u("root", { toc: expect.anything(), footnotes: [] }, [
      u(
        "section",
        {
          heading: u("heading", { depth: 1, identifier: "Hello,-World!" }, [
            u("text", "Hello, World!"),
          ]),
        },
        [u("paragraph", [u("text", "This is a test article.")])],
      ),
    ]),
  });
});
