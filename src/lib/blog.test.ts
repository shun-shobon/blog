import { getArticlePath, getArticle, fetchArticles } from "./blog";
import * as E from "fp-ts/lib/Either";

describe("getArticlePath", () => {
  it("特定のディレクトリ下のMarkdownファイルのパスを全件取得する", async () => {
    expect(await getArticlePath("tests/articles")).toStrictEqual([
      "2021-12-05/test1/main.md",
      "2021-12-05/test2/main.md",
      "2021-12-06/test3/main.md",
    ]);
  });
});

describe("getArticle", () => {
  it("特定のMarkdownファイルをパースして、記事オブジェクトを取得する", async () => {
    const article = await getArticle(
      "tests/articles",
      "2021-12-05/test1/main.md",
    );

    expect(E.isRight(article)).toBeTruthy();
    if (E.isLeft(article)) return;

    expect(article.right.slug).toBe("2021-12-05-test1");
    expect(article.right.title).toBe("Test Article 1");
    expect(article.right.postedAt).toBe("2021-12-05T00:00:00.000Z");
    expect(article.right.tags).toStrictEqual(["foo", "bar"]);
  });
});

describe("fetchArticles", () => {
  it("特定のディレクトリ下のMarkdownファイルを全件取得する", async () => {
    const articles = await fetchArticles("tests/articles");

    expect(E.isRight(articles)).toBeTruthy();
    if (E.isLeft(articles)) return;

    expect(articles.right).toHaveLength(3);
    expect(articles.right[0]?.slug).toBe("2021-12-05-test1");
    expect(articles.right[2]?.title).toBe("Test Article 3");
  });
});
