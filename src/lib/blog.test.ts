import { getArticlePath } from "./blog";

describe("getArticlePath", () => {
  it("特定のディレクトリ下のMarkdownファイルのパスを全件取得する", async () => {
    expect(await getArticlePath("tests/articles")).toStrictEqual([
      "2021-12-05/test1.md",
      "2021-12-05/test2.md",
      "2021-12-06/test3.md",
    ]);
  });
});

describe("getArticle", () => {
  it("特定のMarkdownファイルをパースして、記事オブジェクトを取得する", async () => {
    const article = await getArticle("tests/articles", "2021-12-05/test1.md");

    expect(article.slug).toBe("2021-12-05-test1");
    expect(article.title).toBe("Test Article 1");
    expect(article.postedAt).toBe("2021-12-05T00:00:00.000Z");
    expect(article.tags).toStrictEqual(["foo", "bar"]);
  });
});
