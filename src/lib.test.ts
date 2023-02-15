import { Temporal } from "@js-temporal/polyfill";
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
    content: "\n# Hello, World!\n\nThis is a test article.\n",
  });
});
