/**
 * @jest-environment node
 */
import { Temporal } from "@js-temporal/polyfill";

import { findArticles } from "./lib";

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
