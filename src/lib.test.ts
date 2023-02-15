/**
 * @jest-environment node
 */
import { findArticles } from "./lib";

test("findArticles", async () => {
  const articles = await findArticles("test-articles");
  expect(articles).toEqual(["about", "hello-world"]);
});
