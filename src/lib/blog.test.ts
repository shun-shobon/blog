import { getArticlePath, getArticle } from "./blog";
import type { Heading } from "mdast";
import * as E from "fp-ts/lib/Either";

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

    expect(E.isRight(article)).toBeTruthy();
    if (E.isLeft(article)) return;

    expect(article.right.slug).toBe("2021-12-05-test1");
    expect(article.right.title).toBe("Test Article 1");
    expect(article.right.postedAt).toBe("2021-12-05T00:00:00.000Z");
    expect(article.right.tags).toStrictEqual(["foo", "bar"]);
    expect((article.right.contents.children[0] as Heading).type).toBe(
      "heading",
    );
    expect((article.right.contents.children[0] as Heading).depth).toBe(1);
  });
});
