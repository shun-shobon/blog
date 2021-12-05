import { getArticlePath } from "./blog";

describe("getArticlePath", () => {
  it("特定のディレクトリ下のMarkdownファイルのパスを全件取得する", async () => {
    expect(await getArticlePath("tests/articles")).toStrictEqual([
      "20211205/test1.md",
      "20211205/test2.md",
      "20211206/test3.md",
    ]);
  });
});
