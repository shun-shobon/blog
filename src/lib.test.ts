/**
 * @jest-environment node
 */
import { Temporal } from "@js-temporal/polyfill";

import { findArticles, readArticle } from "./lib";

test("findArticles", async () => {
  const articles = await findArticles("test-articles");
  const helloWorld = articles.find((a) => a.slug === "hello-world");
  const about = articles.find((a) => a.slug === "about");

  expect(helloWorld).toStrictEqual({
    title: "Hello, World!",
    slug: "hello-world",
    postedAt: Temporal.PlainDate.from("2023-01-01"),
    tags: ["hello", "world"],
  });

  expect(about).toStrictEqual({
    title: "About",
    slug: "about",
    postedAt: Temporal.PlainDate.from("2023-02-01"),
    tags: [],
  });
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
