import { ParseError, parseFrontmatter } from "./blog";

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
      return;
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
