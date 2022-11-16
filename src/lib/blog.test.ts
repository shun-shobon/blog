import {
  fetchArticle,
  fetchArticleSummaries,
  ParseError,
  parseFrontmatter,
} from "./blog";
import { unreachable } from "./util";

describe("fetchArticleSummaries", () => {
  // NOTE: jsdom環境ではsetImmediateが存在しないため、setTimeoutで代用する
  let setImmediate: typeof global.setImmediate;
  beforeAll(() => {
    setImmediate = global.setImmediate;
    global.setImmediate =
      global.setImmediate ??
      (<TArgs extends Array<unknown>>(
        fn: (...args: TArgs) => void,
        ...args: TArgs
      ) => global.setTimeout(fn, 0, ...args));
  });
  afterAll(() => {
    // 元に戻す
    global.setImmediate = setImmediate;
  });

  it("success", async () => {
    const articleSummaries = await fetchArticleSummaries();

    expect(articleSummaries).toHaveLength(2);
  });
});

describe("fetchArticle", () => {
  it("success", async () => {
    const slug = "hello-world";
    const article = await fetchArticle(slug);

    expect(article).not.toBeInstanceOf(Error);
    if (article instanceof Error) {
      unreachable();
    }

    expect(article.title).toBe("こんにちは世界");
  });

  it("not found", async () => {
    const slug = "invalid-slug";
    const article = await fetchArticle(slug);

    expect(article).toBeInstanceOf(Error);
  });
});

describe("parseFrontmatter()", () => {
  it("success", () => {
    const value = `title: Hello World
date: "2021-01-01"
tags:
  - tag1
  - tag2`;
    const result = parseFrontmatter(value);

    expect(result).not.toBeInstanceOf(ParseError);
    if (result instanceof ParseError) {
      unreachable();
    }

    expect(result.title).toBe("Hello World");
    expect(result.date).toBe("2021-01-01");
    expect(result.tags).toEqual(["tag1", "tag2"]);
  });

  it("invalid YAML", () => {
    const value = "";
    const result = parseFrontmatter(value);

    expect(result).toBeInstanceOf(ParseError);
  });

  it("invalid format", () => {
    const value = `title: Hello World
date: "2021-01-01"`;
    const result = parseFrontmatter(value);

    expect(result).toBeInstanceOf(ParseError);
  });
});
